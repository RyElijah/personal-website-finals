<template>
  <div>
    <personal-profile /> 
    <br />
    
    <!-- Swiper Component -->
    <swiper
      :slides-per-view="1"
      :space-between="10"
      :pagination="{ clickable: true }"
      :navigation="true"
      :loop="true"
    >
      <swiper-slide>
        <img src="image1.jpg" alt="Slide 1" />
      </swiper-slide>
      <swiper-slide>
        <img src="image2.jpg" alt="Slide 2" />
      </swiper-slide>
      <swiper-slide>
        <img src="image3.jpg" alt="Slide 3" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style>
/* Optional: Add custom styles */
.swiper-slide img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>
