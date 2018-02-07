<template>
  <v-flex v-if="stream" class="pa-1" xs12 sm6 md4>
    <v-card class="subreddit">
      <v-card-title :class="[status, 'darken-1', 'subreddit']">
        <v-icon class="white--text pl-2">{{ streamTypeIcon }}</v-icon>
        <v-spacer></v-spacer>
        <a :href="subredditLink" target="_blank" class="white--text subreddit-header headline">{{ subreddit.name }}</a>
        <v-spacer></v-spacer>
        <div>
          <v-menu bottom left origin="top right">
            <v-btn icon="icon" slot="activator" class="white--text">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list class="pa-0">
              <v-list-tile :to="{ name: 'Edit Subreddit', params:{ id: index }}">
                <v-list-tile-title class="grey--text text--darken-3">Edit Subreddit</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$store.dispatch('removeStream', { index })">
                <v-list-tile-title>Remove Card</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <v-card-text class="article-list-container">
        <v-list class="article-list" three-line dense>
          <template v-for="(article, index) in stream.data.children">
            <subreddit-article-component :article="article"></subreddit-article-component>
            <v-divider v-if="index + 1 < stream.data.children.length"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import SubredditArticleComponent from '@/components/SubredditArticleComponent';

  export default {
    name: 'SubredditComponent',
    data() {
      return {
        stream: null,
        status: '',
      };
    },
    computed: {
      streamTypeIcon() {
        let icon = '';
        switch (this.subreddit.streamType) {
          case 'hot':
            icon = 'whatshot';
            break;
          case 'new':
            icon = 'access_time';
            break;
          case 'rising':
            icon = 'trending_up';
            break;
          case 'top':
            icon = 'arrow_upward';
            break;
          default:
            icon = '';
        }
        return icon;
      },
      subredditLink() {
        return `https://www.reddit.com/r/${this.subreddit.name}/${this.subreddit.streamType}`;
      },
    },
    methods: {
      updateStream() {
        this.$http.get(`${this.subredditLink}.json`)
          .then(
            (resp) => {
              this.stream = typeof resp.data === 'string' ? JSON.parse(resp.data) : resp.data;
              this.status = 'success';
            }, () => {
              this.status = 'error';
            },
          );
      },
    },
    created() {
      this.updateStream();
      setInterval(this.updateStream, 30000);
    },
    components: {
      SubredditArticleComponent,
    },
    props: [
      'subreddit',
      'index',
    ],
  };
</script>
