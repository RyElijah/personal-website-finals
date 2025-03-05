import { createApp } from 'vue';
import App from './App.vue';
import PersonalProfile from './components/PersonalProfile.vue';
import 'swiper/css/swiper-bundle.min.css'; // Import Swiper CSS

const app = createApp(App);
app.component('personal-profile', PersonalProfile);

app.mount('#app');