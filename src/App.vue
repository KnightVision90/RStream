<template>
  <v-app id="app-layout">
    <v-navigation-drawer clipped fixed app stateless v-model="sidebar">
      <v-list dense>
        <template v-for="item in links">
          <v-list-group v-if="item.items">
            <v-list-tile slot="item">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="(subItem,i) in item.items" :key="i" :to="subItem.to">
              <v-list-tile-content>
                <v-list-tile-title v-html="subItem.title" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-subheader v-else-if="item.header" v-text="item.header" />
          <v-divider v-else-if="item.divider" light />
          <v-list-tile v-else :to="item.to" >
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title" />
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left fixed class="blue darken-2 white--text">
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" color="white--text" />
      <v-toolbar-title class="display-2">My /r/ Stream</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid class="py-1 px-0">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      links: [
        {
          title: 'Home',
          to: { name: 'Home' },
        },
        { divider: true },
        { header: 'New Stream' },
        {
          title: 'Reddit',
          groups: '/streams/new/reddit',
          items: [
            {
              title: 'Subreddit',
              to: { name: 'Create Subreddit' },
            },
          ],
        },
      ],
      sidebar: false,
    };
  },
};
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main.styl';
  @import './css/main.scss';
</style>
