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


/*-------------------------------
	順序入れ替え
-------------------------------*/
function switchByWidth() {
  if (window.matchMedia('(max-width: 834px)').matches) {
    $('.sec__intro .lead').after($('.sec__intro .img-holder'));
    $('.sec__newJobs .newJobs__body').after($('.sec__newJobs .commonLink01'));
  } else if (window.matchMedia('(min-width:835px)').matches) {
    $('.sec__intro .txt-holder').before($('.sec__intro .img-holder'));
    $('.sec__newJobs .commonHead01').after($('.sec__newJobs .commonLink01'));
  }
}

window.addEventListener('DOMContentLoaded', function () {
  switchByWidth();
});
window.addEventListener('resize', function () {
  switchByWidth();
});
