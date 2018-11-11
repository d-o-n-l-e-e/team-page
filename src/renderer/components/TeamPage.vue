<template>
<section class="team">
  <div class="ctn">
    <div class="members-list" :data-memberCount="memberCount">
      <div class="member" v-for="(member, index) in Team.data.members" :key="member.email">
        <member-card v-if="member.email" :member="member" :index="index"/>
      </div>
      <div class="member" v-if="!Team.data.members.length">
        <member-card :member="{name:'', email:''}" :index="index"/>
      </div>
    </div>
  </div>
</section>
</template>


<script>
import { mapGetters, mapState } from 'vuex'
import MemberCard from './MemberCard'

export default {
  name: 'Team-page',
  components: {
    MemberCard
  },
  computed: {
    ...mapState([
      'Team'
    ]),
    ...mapGetters([
      'memberCount'
    ])
  }
}

</script>

<style lang="scss" scoped>
.team {
  position: relative;
  z-index: 2;
  padding: 100px 0 30px;

}
.members-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 700px) {
    margin: 0 -1.16%;
    justify-content: initial;
  }
  @media (min-width: 900px) {
    margin: 0 -1%;
  }
}
.member {
  flex-basis: 100%;
  align-items: center;
  margin-bottom: 30px;
  @media (min-width: 500px) {
    flex-basis: 48%;
    margin-bottom: 4%;
  }
  @media (min-width: 700px) {
    flex-basis: 31%;
    margin: 1.16%;
  }
  @media (min-width: 1000px) {
    flex-basis: 23%;
    margin: 1%;
  }
}
</style>
