/*-------------------------------
  タブ切り替え
-------------------------------*/
jQuery(function($){
  $('.tab').click(function(){
    $('.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    $('.is-show').removeClass('is-show');
    // クリックしたタブからインデックス番号を取得
    const index = $(this).index();
    // クリックしたタブと同じインデックス番号をもつコンテンツを表
    $('.panel').eq(index).addClass('is-show');
  });
});


/*-------------------------------
  タブクリックで
  scrolltrigger refresh
-------------------------------*/
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
