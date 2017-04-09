import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/components/HomeComponent';
import SubredditFormComponent from '@/components/SubredditFormComponent';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent,
    },
    {
      path: '/streams/subreddit/create',
      name: 'Create Subreddit',
      component: SubredditFormComponent,
    },
    {
      path: '/streams/subreddit/:id/edit',
      name: 'Edit Subreddit',
      component: SubredditFormComponent,
    },
  ],
});
