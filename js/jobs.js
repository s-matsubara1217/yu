/*-------------------------------
  swiper
-------------------------------*/
const oneday_swiper = new Swiper('.oneday__swiper', {
  loop: true,

  navigation: {
    nextEl: '.oneday__swiper-button-next',
    prevEl: '.oneday__swiper-button-prev',
  },

  scrollbar: {
    el: '.oneday__swiper-scrollbar',
  },
});
