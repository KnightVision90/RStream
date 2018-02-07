<template>
  <div class="home">
    <div class="channels-container">
      <v-layout container fluid>
        <v-layout>
          <subreddit-component v-for="(stream, key) in streams" :index="key" :key="stream" :subreddit="stream"></subreddit-component>
        </v-layout>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SubredditComponent from '@/components/SubredditComponent';

export default {
  name: 'HomeComponent',
  components: {
    SubredditComponent,
  },
  computed: {
    ...mapState(['streams']),
  },
  methods: mapActions(['loadStreams']),
  created() {
    this.loadStreams();
  },
};
</script>

