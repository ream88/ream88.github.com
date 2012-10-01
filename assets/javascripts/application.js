(function() {
  var googleAnalyticsID;

  googleAnalyticsID = 'UA-22268484-1';

  window._gaq = [['_setAccount', googleAnalyticsID], ['_trackPageview']];

  $(function() {
    var base_uri, default_params, params;
    base_uri = 'http://api.flickr.com/services/rest';
    default_params = {
      api_key: '1d73ab087336342b9684547967c62f3d',
      nojsoncallback: '1'
    };
    params = $.extend(default_params, {
      format: 'json',
      media: 'photos',
      method: 'flickr.photosets.getPhotos',
      photoset_id: '72157594229974265'
    });
    return $.getJSON(base_uri, params, function(response) {
      var photo, photos;
      photos = response.photoset.photo;
      photo = photos[Math.floor(Math.random() * photos.length)];
      params = $.extend(default_params, {
        method: 'flickr.photos.getSizes',
        photo_id: photo.id
      });
      return $.getJSON(base_uri, params, function(response) {
        var fakeImg, sizes;
        sizes = response.sizes.size;
        photo = sizes[sizes.length - 2];
        fakeImg = $('<img>', {
          src: photo.source
        });
        return fakeImg.load(function() {
          var background;
          background = $('<div>', {
            id: 'background'
          });
          $('body').prepend(background.css({
            'background-image': "url(" + photo.source + ")"
          }));
          return setTimeout(function() {
            background.addClass('loaded');
            return $('footer aside').addClass('loaded');
          }, 1);
        });
      });
    });
  });

}).call(this);
