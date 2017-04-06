<template>
  <v-list-tile :href="article.data.url">
    <v-list-tile-content>
      <v-list-tile-title>{{ article.data.title }}</v-list-tile-title>
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
  };
</script>
