var App = (function(my, Config){
  my.player;
  my.isPopupOpen = false;

	my.translationInit = function(){
    i18n.init({lng: Config.languages[0]}, function(err, t) {
      $('[data-lang="'+Config.languages[0]+'"]').addClass('active');
      $("body").i18n();
    });

    Config.languages.forEach(function(element, index){
      $('<span/>', {
        class: 'lang-select',
        text: element,
        'data-lang': element
      }).appendTo('#js-i18n-holder');
    });

    $(document).on('click', '.lang-select', function(event){
      $('.lang-select').removeClass('active');
      $(this).addClass('active');
      $.i18n.setLng($(event.target).data('lang'), function(t) {
        $("body").i18n();
      });
    });
	};

  my.generateVideos = function(){
    VideoDatas.forEach(function(element, index){
      if(element.hide){
        return;
      }
      $('<li/>',{
        id: 'video'+index,
        class: 'mini-video',
        'data-url': Config.videoPath+element.file,
        'data-type': element.type,
        'data-name': element.name,
        text: element.name
      }).appendTo('.video-list');
    });
  };
  my.generateVideoPlayer = function(videoUrl, $videoHolder){
    if(my.player !== undefined){
      if(window.location.origin+videoUrl === my.player.L.currentSrc){
        return false;
      }
      my.player.dispose();
    }
    $('<video/>', {
      id: 'currentVideo',
      class: 'video-js vjs-default-skin',
      src: videoUrl
    }).appendTo($videoHolder);
    my.player = videojs('#currentVideo', {
      'controls': true,
      'autoplay': true,
      'preload': 'auto',
      'width': $videoHolder.width(),
      'height': $videoHolder.height()
    });
  };

  my.openPopup = function(){
    my.isPopupOpen = true;
    $('.popup').addClass('open');
  };
  my.closePopup = function(){
    my.isPopupOpen = false;
    $('.popup').removeClass('open');
    // Stop player when close popup
    my.player.pause();
    my.player.currentTime(0);
  };

  my.initVideoPlay = function(){
    $(document).on('click', '.mini-video', function(event){
      my.openPopup();
      my.generateVideoPlayer($(event.target).data('url'), $('.popup'));
    });
  };
  my.initBtnGlobalEvents = function(){
    $(document).on('click', '.btn', function(event) {
      $(event.target).blur();
    });
    $(document).on('click', '.js-objectives', function(event){
      my.openPopup();
      var objVideo = _.find(VideoDatas, function(obj){
        return obj.slug == 'ojectives';
      });
      my.generateVideoPlayer(String(Config.videoPath+objVideo.file), $('.popup'));
      my.player.play();
    });
    $(document).on('click', '.popup .close', function(event){
      my.closePopup();
    });
  };

	my.init = function(){
    console.log('App init');
    my.generateVideos();
    my.initVideoPlay();
		my.translationInit();
    my.initBtnGlobalEvents();
	};
	return my;
}(App || {}, Config || {}));