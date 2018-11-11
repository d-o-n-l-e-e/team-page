<template>
<div :data-mode="MemberDetails.mode">
  <div class="member-details__bg" @click="closeModal"></div>
  <div class="member-details" id="modal">
    <header class="member-details__header">
      <h3 class="member-details__header__text" v-if="MemberDetails.mode == 'adding'">Add Member</h3>
      <h3 class="member-details__header__text" v-if="MemberDetails.mode == 'editing'">Edit Details</h3>
      <h3 class="member-details__header__text" v-if="MemberDetails.mode == 'viewing'">Member Details</h3>
      <button class="btn--secondary icon--btn" aria-label="close" @click="closeModal"><svg-icon icon="close"/></button>
    </header>
    <section class="member-details__body">
      <div class="member-details__message" v-if="error">
        <p>{{ error }}</p>
        <button aria-label="delete" @click="error = false;"><svg-icon icon="close"/></button>
      </div>
      <form class="member-details__form" ref="MemberDetailsForm" @keydown.enter="triggerUpdate">
        <div class="file-ctn">
          <input id="file" class="file-input" type="file" name="image" accept="image/*" ref="memberImage" @change="onFileChange" :disabled="MemberDetails.mode == 'viewing'"/>
          <label class="file-label" for="file">
            <div  v-if="memberImageSrc || MemberDetails.mode == 'viewing'" class="file-image">
              <img v-if="memberImageSrc" :src="memberImageSrc"/>
            </div>
            <div v-if="!memberImageSrc && (MemberDetails.mode == 'adding' || MemberDetails.mode == 'editing')" class="file-cta">
              <div>
                <svg-icon icon="image"/>
              </div>
              <p>Choose an image</p>
            </div>
            <!-- <div class="btn--tertiary icon--btn edit-image-btn" v-if="memberImageSrc && (MemberDetails.mode == 'adding' || MemberDetails.mode == 'editing')"><svg-icon icon="edit"/></div> -->
            <button class="btn--tertiary icon--btn remove-image-btn" v-if="memberImageSrc && (MemberDetails.mode == 'adding' || MemberDetails.mode == 'editing')" @click="removeImageButtonClick"><svg-icon icon="close"/></button>
          </label>
        </div>
        <div class="form-fields">
          <div class="field-row">
            <div class="field-item wide">
              <div class="field-label">
                <label class="label">Name</label>
              </div>
              <div class="field">
                <input type="text" class="input" v-model="memberName" placeholder="Name" required :disabled="MemberDetails.mode == 'viewing'"/>
              </div>
            </div>
          </div>
          <div class="field-row">
            <div class="field-item wide">
              <div class="field-label">
                <label class="label">Email</label>
              </div>
              <div class="field">
                <input type="text" class="input" v-model="memberEmail" placeholder="email@member.com" required :disabled="MemberDetails.mode != 'adding'"/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
    <footer class="member-details__footer">
      <button class="save-btn btn--primary rounded padded" v-if="MemberDetails.mode == 'adding'" @click="triggerAddMember" :disabled="!memberName || !memberEmail">Save Member</button>
      <button class="btn--tertiary rounded padded" v-if="MemberDetails.mode == 'adding' && (memberImageSrc || memberName || memberEmail)" @click="clearForm">Clear</button>
      <button class="remove-btn btn--primary rounded padded" v-if="MemberDetails.mode == 'viewing'" @click="triggerDeleteMember">Remove Member</button>
      <button class="edit-btn btn--tertiary rounded padded" v-if="MemberDetails.mode == 'viewing'" @click="triggerEditMode" >Edit Details</button>
      <button class="update-btn btn--primary rounded padded" v-if="MemberDetails.mode == 'editing'" @click="triggerUpdateMember" :disabled="!memberName || !memberEmail">Update Member</button>
      <button class="cancel-btn btn--tertiary rounded padded" v-if="MemberDetails.mode == 'editing'" @click="triggerViewingMode" >Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SvgIcon from './SvgIcon'

export default {
  name: 'member-details',
  components: {
    SvgIcon
  },
  computed: {
    ...mapState([
      'Team',
      'MemberDetails'
    ])
  },
  data () {
    return {
      memberName: '',
      memberEmail: '',
      memberImageSrc: '',
      error: false
    }
  },
  created () {
    // set values if a selected member exists
    this.setSelectedMember()
  },
  mounted () {
    // closes on ESC
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.closeModal()
      }
    })
  },
  methods: {
    ...mapActions([
      'closeMemberDetails',
      'updateMemberDetailsMode',
      'addMember',
      'updateMember',
      'deleteMember'
    ]),
    closeModal () {
      this.closeMemberDetails()
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      reader.onload = e => {
        this.memberImageSrc = e.target.result
      }
      reader.readAsDataURL(file)
    },
    editImageButtonClick(event) {
      event.preventDefault();
    },
    removeImageButtonClick(event) {
      event.preventDefault();
      this.removeImage();
    },
    removeImage () {
      // clears image field
      this.$refs.memberImage.value = ''
      this.memberImageSrc = ''
    },
    triggerUpdate () {
      // exit if invalid
      if (!this.isValid) {
        this.error = 'Please enter the required fields'
        return
      }
      // submit on ENTER
      switch (this.MemberDetails.mode) {
        case 'adding': this.triggerAddMember(); break;
        case 'editing': this.triggerUpdateMember(); break;
        default: break;
      }
    },
    triggerAddMember () {
      // exit if invalid
      if (!this.isValid) {
        this.error = 'Please enter the required fields'
        return
      }
      // add if the member exists
      if (!this.memberExists(this.memberEmail)) {
        this.closeModal()
        this.addMember({
          name: this.memberName,
          email: this.memberEmail,
          image: this.memberImageSrc
        })
        this.clearForm()
      } else {
        this.error = 'The member email already exists.'
      }
    },
    triggerDeleteMember () {
      this.closeModal()
      this.deleteMember(this.memberEmail)
      this.clearForm()
    },
    triggerUpdateMember () {
      // exit if invalid
      if (!this.isValid) {
        this.error = 'Please enter the required fields'
        return
      }
      // update if the member exists
      if (this.memberExists(this.memberEmail)) {
        this.closeModal()
        this.updateMember({
          name: this.memberName,
          email: this.memberEmail,
          image: this.memberImageSrc
        })
        this.clearForm()
      } else {
        this.error = 'The member email you entered does not exist.'
      }
    },
    triggerEditMode () {
      // set the modal to editing mode
      this.updateMemberDetailsMode('editing')
    },
    triggerViewingMode () {
      // set the modal to viewing mode
      this.setSelectedMember()
      this.updateMemberDetailsMode('viewing')
    },
    setSelectedMember () {
      // sets the values if a member has been selected
      var selectedMember = (this.MemberDetails.selectedMemberIndex || this.MemberDetails.selectedMemberIndex === 0) ? this.Team.data.members[this.MemberDetails.selectedMemberIndex] : undefined;
      this.memberName = (selectedMember) ? selectedMember.name : ''
      this.memberEmail = (selectedMember) ? selectedMember.email : ''
      this.memberImageSrc = (selectedMember) ? selectedMember.image : ''
    },
    memberExists (id) {
      // returns true if a email exists
      const allMembers = this.Team.data.members;
      return allMembers.some(function (el) {
        return el.email === id
      })
    },
    isValid () {
      // returns false if any of the required fields are empty
      return this.memberName && this.memberEmail
    },
    clearForm () {
      // reset values
      this.memberName = ''
      this.memberEmail = ''
      this.removeImage()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/configs';
.member-details {
  &__bg {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-gray-40, 0.8);
  }
  & {
    position: fixed;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 5px 10px;
    border-radius: 4px;
    overflow: hidden;
    border-width: 0;
    border-style: initial;
    border-color: transparent;
    width: 90%;
    max-width: 700px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: $color-black;
    color: $color-white;
    font-size: 20px;
    font-weight: 600;
    &__text {
      display: inline-block;
      margin: 0;
    }
  }
  &__body {
    padding: 20px;
  }
  &__footer {
    padding: 20px;
    background-color: $color-gray-96;
    button + button {
      margin-left: 10px;
    }
    button {
      width: 180px;
    }
    .save-btn,
    .update-btn {
      background: $color-green;
      border-color: $color-green;
    }
    .remove-btn {
      background: $color-red;
      border-color: $color-red;
    }
  }
}

.member-details__form {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.form-fields {
  flex-grow: 1;
}

.field-row {
  display: flex;
  flex-basis: 100%;
}

.field-item {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 10px 0;
}
.field-label {
  text-align: right;
  padding: 0 15px;
  font-size: 1em;
  width: 100px;
  color: $color-gray-40;
}
.field {
  width: calc(100% - 100px);
  input {
    width: 100%;
    line-height: 2.5em;
    padding: 0 1em;
    font-size: 1em;
    font-weight: 600;
    border: 1px solid $color-gray-40;
    background: $color-gray-96;
    &:disabled {
      border: 1px solid $color-gray-90;
      background: $color-white;
    }
  }
}

.file {
  &-ctn {
    position: relative;
    .edit-image-btn,
    .remove-image-btn {
      position: absolute;
      top: 0; right: 0;
      transform: translate(50%, -50%);
    }
  }
  &-input {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
  &-label {
    display: block;
    width: 200px;
    height: 200px;
    border: 1px solid transparent;
    overflow: hidden;
    [data-mode="editing"] & {
      cursor: pointer;
      border: 1px solid $color-gray-40;
    }
  }
  &-image {
    width: 100%;
    height: 100%;
    background: $color-gray-90;
    img {
      width: auto;
      height: 100%;
      vertical-align: bottom;
    }
  }
  &-cta {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $color-gray-90;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: $color-gray-60;
    border: 1px dashed $color-gray-40;
  }
}
</style>

<style lang="scss">
@import '../scss/configs';
.file-cta {
  .icon {
    font-size: 30px;
    svg {
      fill: $color-gray-60;
    }
  }
}
</style>