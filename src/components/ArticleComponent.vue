<template>
  <v-list-tile :href="article.data.url" target="_blank" class="article" avatar>
    <v-list-tile-avatar>
      <img :src="imageSource" :alt="article.data.title" class="article-image">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title class="article-headline">
        {{ article.data.title }}
        <span class="grey--text">({{ article.data.domain }})</span>
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  <!--<a :href="article.data.url" class="link" target="_blank">-->
    <!--<img class="thumbnail" v-if="['default', 'self', ''].indexOf(article.data.thumbnail) === -1" :src="article.data.thumbnail" />-->
    <!--<img class="thumbnail" v-else src="../assets/reddit-logo.png" />-->
    <!--<span class="title">-->
      <!--{{ article.data.title }}-->
    <!--<span class="domain">({{ article.data.domain }})</span>-->
    <!--</span>-->
  <!--</a>-->
</template>

<script>
  export default {
    name: 'ArticleComponent',
    props: ['article'],
    computed: {
      imageSource() {
        return (['default', 'self', ''].indexOf(this.article.data.thumbnail) === -1) && this.article.data.thumbnail !== 'spoiler' ?
            this.article.data.thumbnail :
            '/static/reddit-logo.png';
      },
    },
  };
</script>
