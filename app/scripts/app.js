var App = (function(my, Config){
  my.player;
  my.isPopupOpen = false;

	my.translationInit = function(){
    i18n.init({lng: Config.languages[0]}, function(err, t) {
      $('[data-lang="'+Config.languages[1]+'"]').addClass('active');
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
      $('.lang-select').addClass('active');
      $(this).removeClass('active');
      $.i18n.setLng($(event.target).data('lang'), function(t) {
        $("body").i18n();
      });
    });
	};

  my.generateVideoPlayer = function(videoUrl, $videoHolder, options){
    options = options || {};
    if(my.player !== undefined){
      if(window.location.origin+videoUrl === my.player.currentSrc){
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
      'poster': './assets/images/videoPoster.png',
      'width': $videoHolder.width(),
      'height': $videoHolder.height()
    });
    my.player.on('ended', function(){
      if(options.loop == true){
        my.player.currentTime(options.loopAt);
        my.player.play();
      } else {
        my.closePopup();
      }
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
    $(document).on('click', '.map-holder p', function(event){
      my.openPopup();
      var slug = $(this).data('videoslug');
      var currentObj = _.find(VideoDatas, function(video){
        return video.slug == slug;
      });
      my.generateVideoPlayer(String(Config.videoPath+currentObj.files[i18n.lng()]), $('.popup'));
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
      my.generateVideoPlayer(String(Config.videoPath+objVideo.files[i18n.lng()]), $('.popup'), {loop: true, loopAt: 1});
    });
    $(document).on('click', '.popup .close, .popup-overlay', function(event){
      my.closePopup();
    });

    // Add onclick animations
    $(document).on('touchstart mousedown', '.js-objectives, .lang-select, .map-holder p, .close', function(){
      $(this).addClass('onclick');
    })
    $(document).on('touchend touchcancel mouseup', '.onclick',function(event){
      $(this).removeClass('onclick');
    });
    $(document).on('touchend touchcancel', 'video', function(event){
      if (my.player.paused()) {
        my.player.play();
      }
      else {
        my.player.pause();
      }
    });
  };

	my.init = function(){
    console.log('App init');
    my.initVideoPlay();
		my.translationInit();
    my.initBtnGlobalEvents();
	};
	return my;
}(App || {}, Config || {}));