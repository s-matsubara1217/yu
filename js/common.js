'use strict';

// WebStorageAPI 初回アクセス時だけの処理
const webStorage = function(){

	if(sessionStorage.getItem('access')) {
		// 2回目以降
		document.body.classList.add('js-second-load');
	} else {
		// 初回
		sessionStorage.setItem('access', 0);
		document.body.classList.add('js-first-load');
	}
}
webStorage();


// split text
function spanWrap(targetElm) {
	const targets = [].slice.call(document.querySelectorAll(targetElm));
	targets.forEach(function (target) {
		const nodes = [].slice.call(target.childNodes);
		let spanWrapText = '';

		nodes.forEach(function (node) {
		if (node.nodeType == 3) {
			//テキストの場合
			const text = node.textContent.replace(/\r?\n/g, ''); //テキストから改行コード削除
			spanWrapText = spanWrapText + text.split('').reduce(function (acc, v) {
				return acc + '<span class="js-word">' + v + '</span>';
			}, '');
		} else {
			//テキスト以外 <br>などテキスト以外の要素をそのまま連結
			spanWrapText = spanWrapText + node.outerHTML;
		}
		});

		target.innerHTML = spanWrapText;
	});
}
spanWrap('.js-split');


// loding
function hero() {

	let overlay = document.getElementById("loading");
	let overlayBg = document.getElementById("loading-back");
	let pageWrap = document.getElementById("pageWrap");

	let staggerElm = document.querySelectorAll(".js-hero-stagger");

	let splitText = document.querySelectorAll(".js-word");

	if (document.getElementsByClassName('front-page').length) {
		let tl = gsap.timeline();
		tl
			.to(overlayBg, {
				duration: 1.5,
				y: '-100%',
				ease: "expo.inOut",
			}, '-=0')
			.from( staggerElm , {
				duration: 1.5,
				opacity: 0,
				// filter: 'blur(100px)',
				// y: -50,
				ease: "expo.out",
				// ease: "back.out(1.7)",
				stagger: {
					each: 0.1,
					from: "random",
					grid: "auto"
				},
			}, '-=0.9')
			;
	} else {
		let tl = gsap.timeline();
		tl
			.to(overlayBg, {
				duration: 1.5,
				y: '-100%',
				ease: "expo.inOut",
			}, '+=0')
			// .from(pageWrap, {
			// 	duration: 1,
			// 	opacity: 0,
			// 	ease: "expo.out",
			// }, '-=0.5')
			.from( staggerElm , {
				duration: 1,
				opacity: 0,
				y: 60,
				// ease: "expo.out",
				ease: "expo.out",
				stagger: {
					each: 0.1,
					from: "random",
					grid: "auto"
				},
			}, '-=1')
			;
	}

}
hero();






// ofi
document.addEventListener('DOMContentLoaded', function () {

	const agent = window.navigator.userAgent.toLowerCase();
	const item = document.querySelectorAll(".ofi");

	if (agent.indexOf('trident') != -1 && item.length) {

		function ofi() {
			const contents = this;
			objectFitImages(contents);
		}
		for (let i = 0; i < item.length; i++) {
			ofi();
		}

	}

});


// iphone addClass
if ( navigator.userAgent.indexOf('iPhone') > 0 ) {
	document.body.classList.add("iPhone");
};


// anchor
window.addEventListener('DOMContentLoaded', function () {
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	const anchorLinksArr = Array.prototype.slice.call(anchorLinks);
	const header = document.querySelector('.js-anchorHeight');
	let fixedHeight = 0;

	anchorLinksArr.forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = link.hash;
			const targetElement = document.querySelector(targetId);
			const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;

			if (header) {
				const headerHeight = header.offsetHeight;
				fixedHeight = headerHeight;
			}

			const totalScrollAmount = targetOffsetTop - fixedHeight;
			window.scrollTo({
				top: totalScrollAmount,
				behavior: "smooth"
			});
		});
	});
});


// 	ハンバーガーメニュー
const hamburger_btn = document.querySelector('.drowerBtn');
hamburger_btn.addEventListener('click', function () {
	document.body.classList.toggle('is-drower-open');
});


// load & page scroll check
document.addEventListener('DOMContentLoaded', function () {

	document.body.classList.add('js-loaded');

	function scrollCheck(time) {
		window.addEventListener('scroll' , function() {

			const currentPos = window.pageYOffset;
			const body = document.body;

			if(currentPos > 0) {
				body.classList.add('js-scroll');
			} else {
				body.classList.remove('js-scroll');
			}

		});
	}
	requestAnimationFrame(scrollCheck);

});


// ie closestを有効にする
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector ||
		Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var el = this;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}


// header fixed anime - gsap
function gsFixed() {

	const items = document.getElementsByClassName("js-fixed");

	const showAnim = gsap.from(items , {
		yPercent: -110,
		paused: true,
		duration: 0.7,
		ease: "expo.inOut",
	}).progress(1);

	ScrollTrigger.create({
		start: "top top",
		end: 99999,
		onUpdate: (self) => {
			self.direction === -1 ? showAnim.play() : showAnim.reverse()
		},
		toggleClass: {className: 'is-scrolled', targets:items},
	});

}
gsFixed();


// fade - gsap
function gsFade(elm) {
	const items = document.querySelectorAll(elm);

	items.forEach(item => {

		let option = {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: "back.out(1.7)",
			overwrite: 'auto',
			scrollTrigger: {
				trigger: item,
				toggleActions: "play none none none",
				// toggleActions: "play none none reverse",
				// markers: true,
			},
		}

		ScrollTrigger.matchMedia({
			"(min-width: 834px)": function () {
				option.scrollTrigger.start = '0 70%';
				option.scrollTrigger.id = 'pc';
				gsap.from(item, option);
			},
			"(max-width: 833px)": function () {
				option.scrollTrigger.start = '0 85%';
				option.scrollTrigger.id = 'sp';
				gsap.from(item, option);
			},
			all: function () {
			},
		});

	});

}
gsFade('.js-fade');


// stagger - gsap
function gsStagger(elm) {

	const items = document.querySelectorAll(elm);

	items.forEach(item => {

		let option = {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: "back.out(1.7)",
			overwrite: 'auto',
			stagger: {
				from: "start",
				each: 0.05,
			},
			scrollTrigger: {
				trigger: item,
				// start: '0 70%',
				toggleActions: "play none none none",
				// toggleActions: "play none none reverse",
				toggleClass: "js-active",
				// markers: true,
			},
		}

		ScrollTrigger.matchMedia({
			"(min-width: 834px)": function () {
				option.scrollTrigger.start = '0 70%';
				option.scrollTrigger.id = 'pc';
				gsap.from(item.querySelectorAll('.js-stagger-child'), option);
			},
			"(max-width: 833px)": function () {
				option.scrollTrigger.start = '0 85%';
				option.scrollTrigger.id = 'sp';
				gsap.from(item.querySelectorAll('.js-stagger-child'), option);
			},
			all: function () {
			},
		});

	});

}
gsStagger('.js-stagger');


// text animation - gsap
function gsText(elm) {

	const items = [].slice.call(document.querySelectorAll(elm));

	items.forEach(function (target) {
	  const nodes = [].slice.call(target.childNodes);
	  let spanWrapText = '';

	  nodes.forEach(function (node) {
		if (node.nodeType == 3) {
		  //テキストの場合
		  const text = node.textContent.replace(/\r?\n/g, ''); //テキストから改行コード削除
		  //spanで囲んで連結
		  spanWrapText = spanWrapText +	text.split('').reduce(function (acc, v) {
			  return acc + '<span class="word">' + v + '</span>';
			}, '');
		} else {
		  //テキスト以外 <br>などテキスト以外の要素をそのまま連結
		  spanWrapText = spanWrapText + node.outerHTML;
		}
	  });

	  target.innerHTML = spanWrapText;
	});

	items.forEach(item => {

		let option = {
			defaults: {
				opacity: 0,
				duration: 1,
				y: 50,
				ease: "back.out(1.7)",
				stagger: {
					from: "start",
					each: 0.06,
				},
			},
			scrollTrigger: {
				trigger: item,
				// start: '0 75%',
				toggleActions: "play none none none",
				toggleClass: "js-active",
				// markers: true,
			},
		}

		ScrollTrigger.matchMedia({
			"(min-width: 834px)": function () {
				option.scrollTrigger.start = '0 75%';
				option.scrollTrigger.id = 'gsText_pc';
				const tl = gsap.timeline(option);
				tl.from(item.querySelectorAll(".word"), {});
				// .from(item.querySelectorAll("span:nth-child(even)"), {
				// 	x: '-100%',
				// }, '<');
			},
			"(max-width: 833px)": function () {
				option.scrollTrigger.start = '0 85%';
				option.scrollTrigger.id = 'gsText_sp';
				const tl = gsap.timeline(option);
				tl.from(item.querySelectorAll(".word"), {});
				// tl.from(item.querySelectorAll("span:nth-child(odd)"), {
				// 	x: '100%',
				// })
				// .from(item.querySelectorAll("span:nth-child(even)"), {
				// 	x: '-100%',
				// }, '<');
			},
			all: function () {
			},
		});

	});

}
gsText('.js-text');


// img scrb - gsap    data-scrub="1"
function gsParallaxScrab() {

	// const items = document.querySelectorAll(".js-delayed");
	const items = [].slice.call(document.querySelectorAll(".js-delayed"));

	items.forEach(item => {

		let imageAnim = gsap.to(item.querySelectorAll(".js-delayed-img"), {
			y: "-100%",
			// ease: "none",
			ease: "back.out(1.7)",
			paused: true
		});

		let progressTo = gsap.quickTo(imageAnim, "progress", {
			ease: "power3",
			duration: parseFloat(item.dataset.scrub) || 0.1
		});

		gsap.to(item.querySelectorAll(".js-delayed-inner"), {
			y: "100%",
			// ease: "none",
			ease: "back.out(1.7)",
			scrollTrigger: {
				scrub: true,
				trigger: item,
				start: "0 100%",
				end: "100% 0",
				// markers: true,
				onUpdate: self => progressTo(self.progress)
			}
		});

	});

}
gsParallaxScrab();


// scroll animation
function intersectAnim() {
	const animation = document.querySelectorAll(".js-anime");
	const animationArray = Array.prototype.slice.call(animation, 0);
	const isPC = window.innerWidth > 1024;
	const options = {
		root: null,
		rootMargin: isPC ? "-20% 0px" : "-12% 0px",
		threshold: 0
	};
	const observer = new IntersectionObserver(doWhenIntersect, options);
	animationArray.forEach(function (animation) {
		observer.observe(animation);
	});

	function doWhenIntersect(entries) {
		const entriesArray = Array.prototype.slice.call(entries, 0);

		entriesArray.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add("js-active");
			}
		});
	}

}
intersectAnim();

// ロード時にウィンドウ内に入っている要素にクラスを付与
function loadActive() {
	const animation = document.querySelectorAll(".js-anime");
	const animationArray = Array.prototype.slice.call(animation, 0);

	animationArray.forEach(function (entry) {
		var clientRect = entry.getBoundingClientRect();
		var targetAnime = clientRect.top;
		var windowHeight = window.innerHeight;

		if (targetAnime < windowHeight){
			entry.classList.add("js-active");
		}
	});
}
loadActive();


// youtube　defer 　クラスある時のみ
if (document.getElementsByClassName('youtube').length) {

	function youtube_defer() {
		var iframes = document.querySelectorAll('.youtube');
		iframes.forEach(function(iframe){
			if(iframe.getAttribute('data-src')) {
				iframe.setAttribute('src',iframe.getAttribute('data-src'));
			}
		});
	}
	window.addEventListener('load', youtube_defer)

}
