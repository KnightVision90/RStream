export const addStream = (state, { name, streamType }) => {
  const data = state;
  const stream = { name, streamType };
  data.streams.push(stream);
  data.newStream = '';
  data.newStreamType = state.streamTypes[0];
};

export const deleteStream = (state, { index }) => {
  const data = state;
  data.streams.splice(index, 1);
};

export const setNewStream = (state, { newStream }) => {
  const data = state;
  data.newStream = newStream;
};

export const setNewStreamType = (state, { newStreamType }) => {
  const data = state;
  data.newStreamType = newStreamType;
};

export const setStreams = (state, { streams }) => {
  const data = state;
  data.streams = streams;
};

export const updateStream = (state, { id, name, streamType }) => {
  const data = state;
  data.streams[id].name = name;
  data.streams[id].streamType = streamType;
  data.newStream = '';
  data.newStreamType = state.streamTypes[0];
};
