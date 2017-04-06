<template>
  <div class="home">
    <div class="channels-container">
      <channel-component v-for="(stream, key) in streams" :index="key" :key="stream" :channel="stream"></channel-component>
      <div class="channel add-channel">
        <h2 class="channel-name warning">Add Channel</h2>
        <ul class="channel-list">
          <li>
            <h3>Subreddit</h3>
            <input v-model="newStream" @keyup.enter="submitSubreddit">
            <button @click="submitSubreddit">ADD</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelComponent from '@/components/ChannelComponent';

export default {
  name: 'HomeComponent',
  data() {
    return {
      newStream: '',
      streams: [],
    };
  },
  components: {
    ChannelComponent,
  },
  methods: {
    loadStreams() {
      this.streams = [];
      if (window.localStorage) {
        const savedStreams = JSON.parse(localStorage.getItem('streams'));
        if (Array.isArray(savedStreams)) {
          this.streams = savedStreams;
        } else {
          this.saveStreams();
        }
      }
    },
    removeStream(index) {
      this.streams.splice(index, 1);
      this.saveStreams();
    },
    saveStreams() {
      if (window.localStorage) {
        localStorage.setItem('streams', JSON.stringify(this.streams));
      }
    },
    submitSubreddit() {
      const value = this.newStream.toLowerCase();
      this.streams.push(value);
      this.saveStreams();
      this.newStream = '';
    },
  },
  created() {
    this.loadStreams();
  },
};
</script>

