<template>
  <div class="channel" v-if="stream">
    <h2 :class="['channel-name', status]">
      <a :href="subreddit" target="_blank">
        {{ channel }}
      </a>
      <span class="close" @click="$parent.removeStream(index)">X</span>
    </h2>
    <ul class="channel-list">
      <li class="article" v-for="article in stream.data.children">
        <article-component :article="article"></article-component>
      </li>
    </ul>
  </div>
</template>

<script>
  import ArticleComponent from './ArticleComponent';

  export default {
    name: 'ChannelComponent',
    data() {
      return {
        stream: null,
        status: '',
      };
    },
    computed: {
      subreddit() {
        return `https://www.reddit.com/r/${this.channel}`;
      },
    },
    methods: {
      updateStream() {
        this.$http.get(`${this.subreddit}/new.json`)
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
      'index',
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
  .close {
    cursor: pointer;
    display: inline-block;
    float: right;
    margin-right: 5px;
  }
  .close:hover {
    color: #666;
  }
  .channel-name {
    border-bottom: 1px solid #333;
    text-transform: capitalize;
    margin: 0;
    padding: 2px;
    text-align: center;
  }
  .channel-name a {
    text-decoration: none;
    color: #333;
  }
  .channel-name.success {
    background-color: #5ACCFF;
  }
  .channel-name.error {
    background-color: #FF9C9A;
  }
  .channel-name.warning {
    background-color: #dfff56;
  }
  .channel-list {
    padding: 5px;
    list-style: none;
    height: 300px;
    overflow-y: auto;
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
