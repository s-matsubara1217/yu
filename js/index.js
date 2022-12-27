'use strict';

// main slider
document.addEventListener('DOMContentLoaded', function () {

	const swiperSub = new Swiper('.hero__sub__swiper', {
		// slideToClickedSlide: true,
		// effect: "fade",
		parallax: true,
		effect: 'slide',
		speed: 750,
        // watchSlidesVisibility: true,
        watchSlidesProgress: true,
        loop: true,
        // thumbs: {
        //     swiper: swiper
        // }
    });

	const swiperMain = new Swiper(".hero__main__swiper", {
		loop: true,
		loopedSlides: 1,
		slidesPerView: 1,
		parallax: true,
		effect: 'slide',
		allowTouchMove: false,
		speed: 1200,
		autoplay: {
			delay: 4000,
			stopOnLastSlide: false,
			disableOnInteraction: false,
			// reverseDirection: false
		},
		followFinger: false,
		pagination: {
            el: ".hero__main__swiper-pagination",
            type: "fraction",
		},
		on: {
			resize: function () {
				// console.log('swiper resized');
				this.autoplay.paused = false;
				this.autoplay.start();
			},
		},
		thumbs: {
			swiper: swiperSub
		}
    });

});


// News tab
document.addEventListener('DOMContentLoaded', function () {
	// タブに対してクリックイベントを適用
	const tabs = document.getElementsByClassName('js-tab-trigger');

	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', tabSwitch);
	}

	// タブをクリックすると実行する関数
	function tabSwitch() {
		// 引数で指定したセレクターと一致する直近の祖先要素を取得
		const ancestorEle = this.closest('.js-tabPanel');

		// タブのclassの値を変更
		ancestorEle.getElementsByClassName('is-active')[0].classList.remove('is-active');
		this.classList.add('is-active');

		// コンテンツのclassの値を変更
		ancestorEle.getElementsByClassName('is-show')[0].classList.remove('is-show');
		const groupTabs = ancestorEle.getElementsByClassName('js-tab-trigger');
		const arrayTabs = Array.prototype.slice.call(groupTabs);
		const index = arrayTabs.indexOf(this);
		ancestorEle.getElementsByClassName('js-tab-target')[index].classList.add('is-show');


		setTimeout(function () {
			ScrollTrigger.refresh();
		}, 1000);
	};

});


// business slider
// document.addEventListener('DOMContentLoaded', function () {

// 	const swiperElement = document.querySelectorAll(".business-swiper");

// 	swiperElement.forEach((slider) => {

// 		const swiperWrapper = slider.querySelector(".swiper-wrapper");
// 		const swiperSlide = slider.querySelectorAll(".swiper-slide");
// 		const mql = window.matchMedia('(max-width: 833px)');
// 		let swiper = undefined;
// 		const options = {
// 			speed: 400,
// 			watchOverflow: true,
// 			spaceBetween: 30,
// 			slidesPerView: 1.1,
// 			freeMode: true,
// 			centeredSlides: true,
// 			// autoplay: {
// 			// 	delay: 4000,
// 			// 	disableOnInteraction: false,
// 			// },
// 			navigation: {
// 				nextEl: ".swiper-button-next",
// 				prevEl: ".swiper-button-prev",
// 			},
// 		};


// 		function initSwiper() {
// 			if (slider) {
// 				if (mql.matches && swiper == undefined) {
// 					swiper = new Swiper(slider, options);
// 				} else if (swiper != undefined) {
// 					// pc
// 					swiper.destroy();
// 					swiper = undefined;
// 					for (var i = 0; i < swiperWrapper.length; i++) {
// 						swiperWrapper[i].removeAttribute('style');
// 					}
// 					for (var i = 0; i < swiperSlide.length; i++) {
// 						swiperSlide[i].removeAttribute('style');
// 					}
// 				}
// 			}
// 		}

// 		mql.addListener(initSwiper);
// 		initSwiper(mql);

// 	});

// });
