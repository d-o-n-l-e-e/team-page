const state = {
  isActive: false,
  mode: undefined,
  selectedMemberIndex: null,
}

const mutations = {
  CLOSE_DETAILS(state) {
    state.isActive = false
    state.mode = undefined
    state.selectedMemberIndex = null
  },
  UPDATE_MODE(state, mode) {
    state.mode = mode
  },
  OPEN_DETAILS(state, selectedMemberIndex) {
    state.isActive = true
    state.mode = selectedMemberIndex || selectedMemberIndex === 0 ? 'viewing' : 'adding'
    state.selectedMemberIndex = selectedMemberIndex || selectedMemberIndex === 0 ? selectedMemberIndex : null
  }
}

const actions = {
  closeMemberDetails({ commit }) {
    document.documentElement.classList.remove('modal-open');
    commit('CLOSE_DETAILS')
  },
  updateMemberDetailsMode({ commit }, mode) {
    commit('UPDATE_MODE', mode)
  },
  openMemberDetails({ commit }, selectedMemberIndex) {
    document.documentElement.classList.add('modal-open');
    commit('OPEN_DETAILS', selectedMemberIndex)

  }
}

export default {
  state,
  mutations,
  actions
}
