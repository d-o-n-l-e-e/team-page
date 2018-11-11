import updateTeam from '../../js/update-members'

const state = {
  data: require('../../../../static/myTeam.json')
}

const getters = {
  memberCount(state) {
    return (state.data && state.data.members) ? state.data.members.length : 0;
  }
}

const mutations = {
  ADD_MEMBER(state, newMember) {
    // add new member
    state.data.members.push(newMember);
    //format data
    let updatedTeam = {
      members: state.data.members
    }
    // update file
    updateTeam(updatedTeam)
  },
  UPDATE_MEMBER(state, updatedMember) {
    // get selected member
    var selectedMember = state.data.members.find(function(member) {
      return member.email === updatedMember.email
    })
    // update selected member
    state.data.members[state.data.members.indexOf(selectedMember)] = updatedMember
    // format data
    let updatedTeam = {
      members: state.data.members
    }
    state.data.members.push({}) // needed to trigger update
    state.data.members.pop() // needed to trigger update
    // update file
    updateTeam(updatedTeam)
  },
  DELETE_MEMBER(state, memberId) {
    // update team
    state.data.members = state.data.members.filter(member => (member.email !== memberId))
    // format data
    let updatedTeam = {
      members: state.data.members
    }
    // update file
    updateTeam(updatedTeam)
  }
}

const actions = {
  addMember({ commit }, memberData) {
    commit('ADD_MEMBER', memberData)
  },
  updateMember({ commit }, memberData) {
    commit('UPDATE_MEMBER', memberData)
  },
  deleteMember({ commit }, memberId) {
    commit('DELETE_MEMBER', memberId)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
