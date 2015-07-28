var App = (function(my, Config){
  my.player;

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

  my.initVideoPlay = function(){
    $(document).on('click', '.mini-video', function(event){
      if(my.player !== undefined){
        if(window.location.origin+$(event.target).data('url') === my.player.L.currentSrc){
          return false;
        }
        my.player.dispose();
      }
      $('<video/>', {
        id: 'currentVideo',
        class: 'video-js vjs-default-skin',
        src: $(event.target).data('url')
      }).appendTo('.video-holder');
      my.player = videojs('#currentVideo', {
        'controls': true,
        'autoplay': true,
        'preload': 'auto',
        'width': 640,
        'height': 360
      });
    });
  };
  my.initBtnGlobalEvents = function(){
    $(document).on('click', '.btn', function(event) {
      $(event.target).blur();
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