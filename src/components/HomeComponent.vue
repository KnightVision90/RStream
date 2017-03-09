<template>
  <div class="home">
    <h1>RStream</h1>
    <div class="container">
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
import ChannelComponent from './ChannelComponent';

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
      if (this.streams.indexOf(value) === -1) {
        this.streams.push(value);
        this.saveStreams();
      }
      this.newStream = '';
    },
  },
  created() {
    this.loadStreams();
  },
};
</script>

<style>
  h1 {
    margin: 10px 0;
    text-align: center;
    color: #2c3e50;
  }
  h3 {
    margin: 5px 0;
    text-align: center;
  }

  .container {
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .add-channel input {
    display: block;
    width: 100%;
    padding: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .add-channel button {
    margin-top: 5px;
    display: block;
    width: 100%;
    padding: 5px;
    background-color: #88FF88;
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
