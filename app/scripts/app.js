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
      'autoplay': false,
      'preload': 'auto',
      'poster': '/assets/images/videoPoster.png',
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
    $(document).on('click', '.map-holder p', function(event){
      my.openPopup();
      var slug = $(this).data('videoslug');
      var currentObj = _.find(VideoDatas, function(video){
        return video.slug == slug;
      });
      my.generateVideoPlayer(String(Config.videoPath+currentObj.file), $('.popup'));
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
    });
    $(document).on('click', '.popup .close, .popup-overlay', function(event){
      my.closePopup();
    });

    // Add onclick animations
    $(document).on('touchstart mousedown', '.js-objectives, .lang-select, .map-holder p', function(){
      $(this).addClass('onclick');
    })
    $(document).on('touchend touchcancel mouseup', '.onclick',function(event){
      $(this).removeClass('onclick');
    });
  };

	my.init = function(){
    console.log('App init');
    // my.generateVideos();
    my.initVideoPlay();
		my.translationInit();
    my.initBtnGlobalEvents();
	};
	return my;
}(App || {}, Config || {}));