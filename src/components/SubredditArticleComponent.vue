<template>
  <v-list-tile :href="article.data.url" target="_blank" class="article px-0 py-2 my-0" avatar>
    <v-list-tile-avatar>
      <img :src="imageSource" :alt="article.data.title" class="article-image">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title class="article-headline">
        {{ article.data.title }}
        <span class="grey--text text--darken-1">({{ article.data.domain }})</span>
      </v-list-tile-title>

      <v-list-tile-sub-title class="mt-2">
        <v-layout row justify-space-between>
          <v-flex xs6 >
            <a :href="commentsLink" target="_blank" class="blue-grey--text">
              {{ pluralizedComments }}
            </a>
          </v-flex>
          <v-flex right xs6>
            <a :href="userLink" target="_blank" class="blue-grey--text">/u/{{ article.data.author }}</a>
          </v-flex>
        </v-layout>
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import pluralize from 'pluralize';

  export default {
    name: 'SubredditArticleComponent',
    props: ['article'],
    computed: {
      pluralizedComments() {
        return pluralize('Comment', this.article.data.num_comments, true);
      },
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
