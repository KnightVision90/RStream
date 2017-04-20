<template>
  <v-col v-if="stream" class="py-2" sm12 md6 lg4>
    <v-card class="subreddit">
      <v-card-row :class="[status, 'darken-1']">
        <v-card-title class="subreddit">
          <v-icon class="white--text pl-2">{{ streamTypeIcon }}</v-icon>
          <v-spacer></v-spacer>
          <a :href="subredditLink" target="_blank" class="white--text subreddit-header">{{ subreddit.name }}</a>
          <v-spacer></v-spacer>
          <div>
            <v-menu id="marriot" bottom left origin="top right">
              <v-btn icon="icon" slot="activator" class="white--text">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-item>
                  <v-list-tile router :href="{ name: 'Edit Subreddit', params:{ id: index }}">
                    <v-list-tile-title class="grey--text text--darken-3">Edit Subreddit</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
                <v-list-item>
                  <v-list-tile>
                    <v-list-tile-title @click="$store.dispatch('removeStream', { index })">Remove Card</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card-title>
      </v-card-row>
      <v-card-text class="article-list-container">
        <v-list class="article-list" three-line dense>
          <v-list-item v-for="(article, index) in stream.data.children" :key="article.id">
            <subreddit-article-component :article="article"></subreddit-article-component>
            <v-divider v-if="index + 1 < stream.data.children.length"></v-divider>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
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
