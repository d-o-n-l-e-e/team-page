<template>
<div id="app">
  <nav-bar/>
  <router-view/>
  <member-details v-if="MemberDetails.isActive"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from './components/NavBar'
import MemberDetails from './components/MemberDetails'

export default {
  components: {
    NavBar,
    MemberDetails
  },
  computed: {
    ...mapState([
      'MemberDetails'
    ]),
  }
}
</script>

<style lang="scss">
@import './scss/global';
</style>

<style lang="scss" scoped>
@import './scss/configs';
#app {
  background-color: $color-gray-96;
  min-height: 100vh;
  overflow: auto;
}
</style>
