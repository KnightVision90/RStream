<template>
  <v-list-tile :href="article.data.url" target="_blank" class="article px-0 my-0" avatar>
    <v-list-tile-avatar>
      <img :src="imageSource" :alt="article.data.title" class="article-image">
    </v-list-tile-avatar>

    <v-list-tile-content class="px-1 py-1">
      <v-list-tile-title class="article-headline">
        {{ article.data.title }}
        <span class="grey--text text--darken-1">({{ article.data.domain }})</span>
      </v-list-tile-title>

      <v-list-tile-sub-title class="mt-2 article-details">
        <v-layout row justify-space-between>
          <v-flex class="text-xs-center" xs6>
            <a :href="commentsLink" target="_blank" class="article-detail-link">
              <v-icon>message</v-icon>
              <br />
              {{ article.data.num_comments }}
            </a>
          </v-flex>
          <v-flex class="text-xs-center" right xs6>
            <a :href="userLink" target="_blank" class="article-detail-link">
              <v-icon>person</v-icon>
              <br />
              {{ article.data.author }}
            </a>
          </v-flex>
        </v-layout>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action class="py-1">
      <div class="reddit-ranking">
        <v-icon>arrow_upward</v-icon>
        <br>
        {{ article.data.ups }}
      </div>
      <div class="reddit-ranking">
        {{ article.data.downs }}
        <br />
        <v-icon>arrow_downward</v-icon>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>

  export default {
    name: 'SubredditArticleComponent',
    props: ['article'],
    computed: {
      commentsLink() {
        return `https://reddit.com${this.article.data.permalink}`;
      },
      imageSource() {
        return (['default', 'self', ''].indexOf(this.article.data.thumbnail) === -1) && this.article.data.thumbnail !== 'spoiler' ?
            this.article.data.thumbnail :
            '/static/reddit-logo.png';
      },
      userLink() {
        return `https://reddit.com/u/${this.article.data.author}`;
      },
    },
  };
</script>
