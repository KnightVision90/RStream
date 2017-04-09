module.exports = {
  formatStream({ state, stream }) {
    if (typeof stream === 'string') {
      return {
        name: stream,
        streamType: state.streamTypes[0].text,
      };
    }

    return stream;
  },
};
