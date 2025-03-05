import { createRouter, createWebHistory } from 'vue-router';
import PersonalProfile from '@/components/PersonalProfile.vue';
import Comments from '@/components/Comments.vue'

const routes = [
    { path: '/', component: PersonalProfile }, 
    { path:  '/comments', component: Comments}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;