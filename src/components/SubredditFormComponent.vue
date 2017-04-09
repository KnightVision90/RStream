<template>
  <v-card class="grey lighten-4 elevation-0 ma-2">
    <v-card-text>
      <h5>{{ $route.name }}</h5>
      <v-container fluid>
        <v-row row>
          <v-col xs4 md2>
            <v-subheader>Subreddit Name</v-subheader>
          </v-col>
          <v-col xs8 md10>
            <v-text-field
              v-model="newStream"
              label="Subreddit"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row row>
          <v-col xs4 md2>
            <v-subheader>Stream Type</v-subheader>
          </v-col>
          <v-col xs8 md10>
            <v-select
              :items="streamTypes"
              v-model="newStreamType"
              label="Stream Type"
              light
              single-line
              auto
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-row actions>
      <v-btn error router href="/">Go Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn success @click.native="submitSubreddit">Save</v-btn>
    </v-card-row>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddSubredditComponent',
  computed: {
    ...mapState(['streamTypes']),
    newStream: {
      get() {
        return this.$store.state.newStream;
      },
      set(value) {
        this.$store.commit('setNewStream', { newStream: value });
      },
    },
    newStreamType: {
      get() {
        return this.$store.state.newStreamType;
      },
      set(value) {
        this.$store.commit('setNewStreamType', { newStreamType: value });
      },
    },
  },
  methods: {
    ...mapActions(['submitSubreddit']),
  },
  created() {
    if (this.$route.name === 'Edit Subreddit') {
      const stream = this.$store.state.streams[this.$route.params.id];
      const newStreamType = this.$store.state
        .streamTypes.find(type => type.text === stream.streamType);
      this.$store.commit('setNewStreamType', { newStreamType });
      this.$store.commit('setNewStream', { newStream: stream.name });
    }
  },
};
</script>
