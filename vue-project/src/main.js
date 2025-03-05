import { createApp } from 'vue';
import App from './App.vue';
import PersonalProfile from './components/PersonalProfile.vue';

// Import Swiper CSS globally
import 'swiper/css';
import 'swiper/css/effect-cards'; // Add other Swiper effect styles if needed

const app = createApp(App);
app.component('personal-profile', PersonalProfile);

app.mount('#app');
