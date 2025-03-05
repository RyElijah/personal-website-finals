import { createApp } from 'vue';
import App from './App.vue';
import PersonalProfile from './components/PersonalProfile.vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';

const app = createApp(App);
app.component('personal-profile', PersonalProfile);

app.mount('#app');
