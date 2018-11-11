<template>
<nav class="nav">
  <div class="ctn ctn--flex">
    <div class="nav__logo">
      <h1>My Team</h1>
    </div>
    <div class="nav__items">
      <div class="nav__item">
      </div>
      <div class="nav__item">
        <button class="add-member-btn btn--primary rounded padded" @click="triggerAddMemberModal"><svg-icon icon="add"/><span>Add Member</span></button>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { mapActions } from 'vuex'
import SvgIcon from './SvgIcon'

export default {
  name: 'nav-bar',
  components: {
    SvgIcon
  },
  methods: {
    ...mapActions([
      'openMemberDetails'
    ]),
    triggerAddMemberModal () {
      this.openMemberDetails();
    },
    goBack () {
      this.$router.back('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/configs';
.nav {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba($color-white, 1);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 5px 10px;
  &__logo {
    display: flex;
    align-items: center;
    font-size: 18px;
    &__image {
      height: 32px;
      width: auto;
      margin-right: 10px;
    }
  }
  &__items {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
  }
  &__item {
    font-size: 14px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
