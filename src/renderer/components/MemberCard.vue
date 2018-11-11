<template>
<div class="member__card rounded has-hover" @click="triggerMemberDetails">
  <div class="member__card__content">
    <div class="member__card__content__image" v-if="member.email">
      <img v-if="member.image" :src="member.image"/>
    </div>
    <div class="member__card__content__image" v-if="!member.email">
      <span class="no-members">
        <svg-icon icon="add"/>
      </span>
    </div>
    <div class="member__card__content__name">{{member.name}}</div>
    <div class="member__card__content__email" v-if="member.email">Email: <span>{{member.email}}</span></div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SvgIcon from './SvgIcon'

export default {
  name: 'member-card',
  props: [
    'member',
    'index'
  ],
  components: {
    SvgIcon
  },
  computed: {
    ...mapState([
      'Team'
    ])
  },
  watch: {
    Team () {
      this.member = this.Team.data.members[this.index]
    }
  },
  methods: {
    ...mapActions([
      'openMemberDetails'
    ]),
    triggerMemberDetails () {
      this.openMemberDetails(this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/configs';
// member card styles
.member__card {
  cursor: pointer;
  display: block;
  text-align: center;
  padding: 30px 10px;
  background: rgb(255, 255, 255);
}

// member image styles
.member__card__content {
  $member-image-size: 140px;
  &__image {
    width: $member-image-size;
    height: $member-image-size;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    background: $color-gray-90;
    position: relative;
    img {
      width: auto;
      height: $member-image-size;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    span.no-members {
      font-size: 30px;
      color: $color-gray-90;
      fill: $color-gray-60;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      position: absolute;
      display: inline-block;
      line-height: 1em;
    }
  }
}

.member__card__content {
  &__name {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  &__email {
    margin-top: 10px;
    font-size: 18px;
  }
}
</style>

