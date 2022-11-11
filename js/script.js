(function($) {


	/*-------------------------------
		objectFitImages
	-------------------------------*/
	objectFitImages('img.ofi');


	/*-------------------------------
		iPhone/iPad class
	-------------------------------*/
	var ua = navigator.userAgent.toLowerCase();

	if ( ua.indexOf('iPhone') > 0 ) {
		$("body").addClass("iPhone");
	}else if ( ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document ) {
		$("body").addClass("iPad");
	}


	/*-------------------------------
		ロード判定
	-------------------------------*/
	$(window).on('load',function(){
		$('body').addClass('js-loaded');
	});

	//loading
	var webStorage = function(){
		if(sessionStorage.getItem('access')){
		} else {
			sessionStorage.setItem('access', 0);
			let body = document.body;
			body.classList.add('once');
		}
	}
	webStorage();


	/*-------------------------------
		スクロール判定
	-------------------------------*/
	$(window).on('load scroll',function(){
		var s_top = $(window).scrollTop();
		if(s_top > 0){
			$('body').addClass('js-scroll');
		}else{
			$('body').removeClass('js-scroll');
		}
	});


	/*-------------------------------
		aのクリックイベント
	-------------------------------*/
	$('a').on('click', function (e) {

		var str = this.getAttribute('href').substring(0, 1),
				$linktype = $(this).attr('target'),
				$call = this.getAttribute('href').substring(0, 3);


		//固定要素を取得
		var headerElm = document.querySelector('.header');
		var anchorElm = document.querySelector('.anchorList');
		var fixedHeight = 0;

		if (anchorElm) {
			fixedHeight = headerElm.offsetHeight;
		} else {
			fixedHeight = 0;
		}

		if (str === "#") {
			//スムーズスクロールをさせる
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $("[name=' + this.hash.slice(1) + ']");
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - fixedHeight
					}, 700);
					return false;
				}
			}
		} else if ($linktype == "_blank" || $call == "tel") {
			//何もしない
		}
	});


	/*-------------------------------
		IEでclosestを有効にする
	-------------------------------*/
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector;
	}
	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var el = this;

			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}


	/*-------------------------------
		ハンバーガーメニュー
	-------------------------------*/
	$(".openbtn").click(function () {
		$(this).toggleClass('active');
			$("#gnav").toggleClass('panelactive');
		$(".circle-bg").toggleClass('circleactive');
		$(".hamburger").toggleClass('js-open');
	});
	$("#gnav a").click(function () {
			$(".openbtn").removeClass('active');
			$("#gnav").removeClass('panelactive');
			$(".circle-bg").removeClass('circleactive');
	});


	/*-------------------------------
		 スクロールアクション
	 -------------------------------*/
	function scrollAnime() {
		const animation = document.querySelectorAll('.anime');
		const animationArray = Array.prototype.slice.call(animation, 0);

		const options = {
			root: null,
			rootMargin: '-100px 0px -100px',
			threshold: 0,
		};
		const observer = new IntersectionObserver(doWhenIntersect, options);
		animationArray.forEach(function (animation) {
			observer.observe(animation);
		});

		function doWhenIntersect(entries) {
			const entriesArray = Array.prototype.slice.call(entries, 0);

			entriesArray.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('js-active');
				}
			});
		}
	}
	scrollAnime();

	//ロード時、ウィンドウ内に入っている要素は強制的に表示
	function loadActive() {
		$('.anime').each(function () {
			var targetAnime = $(this).offset().top;
			var windowHeight = $(window).height();
			if (targetAnime < windowHeight) {
				$(this).addClass('js-active');
			}
		});
	}
	loadActive();


	/*-------------------------------
		 文字列を分割
	 -------------------------------*/
	 function spanWrap(targetElm) {
		const targets = [].slice.call(document.querySelectorAll(targetElm));
		targets.forEach(function (target) {
			const nodes = [].slice.call(target.childNodes);
			let spanWrapText = '';

			nodes.forEach(function (node) {
				if (node.nodeType == 3) {
					//テキストの場合
					const text = node.textContent.replace(/\r?\n/g, ''); //テキストから改行コード削除
					//spanで囲んで連結
					spanWrapText =
						spanWrapText +
						text.split('').reduce(function (acc, v) {
							return acc + '<span>' + v + '</span>';
						}, '');
				} else {
					//テキスト以外
					//<br>などテキスト以外の要素をそのまま連結
					spanWrapText = spanWrapText + node.outerHTML;
				}
			});

			target.innerHTML = spanWrapText;
		});
	}
	spanWrap('.split');

	$('.split span').each(function () {
		var txt = $(this).html();
		$(this).html(
			txt.replace(' ', '&nbsp;')
		);
	});


})(jQuery);
