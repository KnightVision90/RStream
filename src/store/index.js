import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const streamTypes = [
  { text: 'hot' },
  { text: 'new' },
  { text: 'rising' },
  { text: 'top' },
];

const state = {
  streams: [],
  newStream: '',
  newStreamType: streamTypes[0],
  streamTypes,
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
});

export default store;
