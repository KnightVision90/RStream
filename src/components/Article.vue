<template>
  <a :href="article.data.url" class="link" target="_blank">
    <img class="thumbnail" v-if="['default', 'self', ''].indexOf(article.data.thumbnail) === -1" :src="article.data.thumbnail" />
    <img class="thumbnail" v-else src="../assets/reddit-logo.png" />
    <span class="title">
      {{ article.data.title }}
    </span>
  </a>
</template>

<script>
  export default {
    name: 'Article',
    props: ['article'],
  };
</script>

<style>
  .link {
    display: flex;
    text-decoration: none;
    color: #333;
  }
  .title {
    padding: 5px;
    text-align: left;
  }
  .thumbnail {
    width: 50px;
    height: 50px;
  }
</style>
