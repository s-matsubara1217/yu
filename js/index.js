/*-------------------------------
  メインビジュアル
-------------------------------*/
const hero_main_Swiper = new Swiper('.hero__main__swiper', {
  loop: true,

  pagination: {
    el: '.hero__main__swiper-pagination',
    type: "fraction",
  },
});
const hero_sub_Swiper = new Swiper('.hero__sub__swiper', {
  loop: true,

});


/*-------------------------------
  News タブ
-------------------------------*/
$(function(){
  $('.tab').click(function () {
      $('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
      $('.is-show').removeClass('is-show');
      const index = $(this).index();
      $('.panel').eq(index).fadeIn(300).addClass('is-show');
      $('.panel').not('.is-show').hide();
    });
});
