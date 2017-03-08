<template>
  <div class="channel" v-if="stream">
    <h2 :class="['channel-name', status]">{{ channel }}</h2>
    <ul class="channel-list">
      <li class="article" v-for="article in stream.data.children">
        <article-component :article="article"></article-component>
      </li>
    </ul>
  </div>
</template>

<script>
  import ArticleComponent from './Article';

  export default {
    name: 'Channel',
    data() {
      return {
        stream: null,
        status: '',
      };
    },
    methods: {
      updateStream() {
        this.$http.get(`https://www.reddit.com/r/${this.channel}/new.json`)
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
      ArticleComponent,
    },
    props: [
      'channel',
    ],

  };
</script>

<style>
  .channel {
    width: 100%;
    margin: 0 0 1%;
    box-sizing: border-box;
    border: 2px solid #333;
  }
  .channel-name {
    border-bottom: 1px solid #333;
    text-transform: capitalize;
    margin: 0;
    padding: 2px;
    text-align: center;
  }
  .channel-name.success {
    background-color: #5ACCFF;
  }
  .channel-name.error {
    background-color: #FF9C9A;
  }
  .channel-list {
    padding: 5px;
    list-style: none;
    height: 500px;
    overflow-y: scroll;
    margin: 0;
  }

  .article {
    vertical-align: top;
    border-bottom: 1px solid #333;
    padding: 5px 0;
  }

  @media screen and (min-width: 700px) {
    .channel {
      width: 48%;
      margin: 0 1% 1%;
    }
  }

  @media screen and (min-width: 1000px) {
    .channel {
      width: 31%;
    }
  }
</style>
