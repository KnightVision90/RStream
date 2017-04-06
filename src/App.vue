<template>
  <v-app id="app-layout" left-sidebar sidebar-under-toolbar>
    <v-toolbar>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-logo>MyStream</v-toolbar-logo>
    </v-toolbar>
    <main>
      <v-sidebar left drawer v-model="sidebar">
        <v-list>
          <v-list-item v-for="i in 3" :key="i">
            <v-list-tile>
              <v-list-tile-title>Item {{ i }}</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
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
      sidebar: false,
    };
  },
};
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main.styl';
  @import './css/main.css';
</style>
