import router from '@/router';
import { formatStream } from '@/helpers';

export const loadStreams = ({ commit, state }) => {
  let streams = [];
  if (window.localStorage) {
    const savedStreams = JSON.parse(localStorage.getItem('streams'));
    if (Array.isArray(savedStreams)) {
      streams = [];
      savedStreams.forEach(stream => streams.push(formatStream({ state, stream })));
    } else {
      this.saveStreams();
    }
  }
  commit('setStreams', { streams });
};

export const removeStream = ({ commit, dispatch }, { index }) => {
  commit('deleteStream', { index });
  dispatch('saveStreams');
};

export const saveStreams = ({ state }) => {
  if (window.localStorage) {
    localStorage.setItem('streams', JSON.stringify(state.streams));
  }
};

export const submitSubreddit = ({ commit, dispatch, state }) => {
  const name = state.newStream.toLowerCase();
  const streamType = state.newStreamType.text;
  if (typeof router.currentRoute.params.id !== 'undefined') {
    commit('updateStream', { id: router.currentRoute.params.id, name, streamType });
  } else {
    commit('addStream', { name, streamType });
  }
  dispatch('saveStreams');
  router.push({ name: 'Home' });
};
