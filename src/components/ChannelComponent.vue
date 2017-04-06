<template>
  <v-card class="channel" v-if="stream">
    <v-card-row class="green darken-1">
      <v-card-title>
        <span class="white--text">{{ channel }}</span>
        <v-spacer></v-spacer>
        <div>
          <v-menu id="marriot" bottom left origin="top right">
            <v-btn icon="icon" slot="activator" class="white--text">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Change Type</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Edit Subreddit</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title @click="$parent.removeStream(index)">Remove Card</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
    </v-card-row>
    <v-card-text>
      <v-list class="article-list" three-line>
        <v-list-item v-for="(article, index) in stream.data.children" :key="article.id">
          <article-component :article="article"></article-component>
          <v-divider v-if="index + 1 < stream.data.children.length"></v-divider>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <!--<div class="channel" v-if="stream">-->
    <!--<h2 :class="['channel-name', status]">-->
      <!--<select v-model="currentType" @change="updateStream" class="stream-type">-->
        <!--<option v-for="type in streamTypes" :value="type">{{ type }}</option>-->
      <!--</select>-->
      <!--<a :href="subreddit" target="_blank">-->
        <!--{{ channel }}-->
      <!--</a>-->
      <!--<span class="close" @click="$parent.removeStream(index)">X</span>-->
    <!--</h2>-->
    <!--<ul class="channel-list">-->
      <!--<li class="article" v-for="article in stream.data.children">-->
        <!--<article-component :article="article"></article-component>-->
      <!--</li>-->
    <!--</ul>-->
  <!--</div>-->
</template>

<script>
  import ArticleComponent from '@/components/ArticleComponent';

  export default {
    name: 'ChannelComponent',
    data() {
      const streamTypes = [
        'hot',
        'new',
        'top',
      ];

      return {
        streamTypes,
        stream: null,
        status: '',
        currentType: streamTypes[0],
      };
    },
    computed: {
      subreddit() {
        return `https://www.reddit.com/r/${this.channel}/${this.currentType}`;
      },
    },
    methods: {
      updateStream() {
        this.$http.get(`${this.subreddit}.json`)
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
