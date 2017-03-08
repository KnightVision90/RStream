<template>
  <div class="home">
    <h1>RStream</h1>
    <div class="container">
      <channel-component v-for="stream in streams" :key="stream" :channel="stream"></channel-component>
    </div>
  </div>
</template>

<script>
import ChannelComponent from './Channel';

export default {
  name: 'home',
  data() {
    return {
      streams: [
        'Politics',
        'Overwatch',
        'Laravel',
      ],
    };
  },
  components: {
    ChannelComponent,
  },
};
</script>

<style>
  h1 {
    margin: 10px 0;
    text-align: center;
    color: #2c3e50;
  }

  .container {
    display: inline-flex;
    flex-wrap: wrap;
  }
</style>
