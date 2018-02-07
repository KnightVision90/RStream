<template>
  <v-card class="grey lighten-2 elevation-2 ma-2">
    <v-card-text>
      <div class="headline">{{ $route.name }}</div>
      <v-container fluid>
        <v-layout row>
          <v-flex sm4 md2 lg1>
            <v-subheader>Subreddit Name</v-subheader>
          </v-flex>
          <v-flex sm8 md10 lg11>
            <v-text-field
              v-model="newStream"
              label="Subreddit"
              @keydown.native.enter="submitSubreddit"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex sm4 md2 lg1>
            <v-subheader>Stream Type</v-subheader>
          </v-flex>
          <v-flex sm8 md10 lg11>
            <v-select
              :items="streamTypes"
              v-model="newStreamType"
              label="Stream Type"
              light
              single-line
              auto
              @keydown.native.enter="submitSubreddit"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" router href="/">Go Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" @click.native="submitSubreddit">Save</v-btn>
    </v-card-actions>
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
