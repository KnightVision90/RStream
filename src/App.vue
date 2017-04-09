<template>
  <v-app id="app-layout" left-sidebar sidebar-under-toolbar>
    <v-toolbar>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-logo>My /r/ Stream</v-toolbar-logo>
    </v-toolbar>
    <main>
      <v-sidebar left drawer v-model="sidebar">
        <v-list dense>
          <template v-for="item in links">
            <v-list-group v-if="item.items">
              <v-list-item slot="item">
                <v-list-tile>
                  <v-list-tile-title v-text="item.title" />
                  <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-item>
              <v-list-item v-for="(subItem,i) in item.items" :key="i">
                <v-list-tile router :href="subItem.to">
                  <v-list-tile-title v-text="subItem.title" />
                </v-list-tile>
              </v-list-item>
            </v-list-group>
            <v-subheader v-else-if="item.header" v-text="item.header" />
            <v-divider v-else-if="item.divider" light />
            <v-list-item v-else>
              <v-list-tile>
                <v-list-tile-title v-text="item.title" />
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-sidebar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
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
