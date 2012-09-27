# Google Analytics
googleAnalyticsID = 'UA-22268484-1'

window._gaq = [['_setAccount', googleAnalyticsID], ['_trackPageview']]


# Flickr Backgrounds
$ ->
  base_uri = 'http://api.flickr.com/services/rest'
  base_params =
    api_key: '1d73ab087336342b9684547967c62f3d'
    nojsoncallback: '1'
  
  params = $.extend base_params,
    format:         'json'
    media:          'photos'
    method:         'flickr.photosets.getPhotos'
    photoset_id:    '72157594229974265'
  
  $.getJSON base_uri, params, (response) ->
    photos = response.photoset.photo
    photo = photos[Math.floor Math.random() * photos.length]
    
    params = $.extend base_params,
      method:   'flickr.photos.getSizes'
      photo_id: photo.id
    
    $.getJSON base_uri, params, (response) ->
      sizes = response.sizes.size
      photo = sizes[sizes.length - 2] # Large
      
      fakeImg = $ '<img>', src: photo.source
      fakeImg.load ->
        background = $ '<div>', id: 'background'
        
        $('body').prepend background.css('background-image': "url(#{photo.source})")
        setTimeout ->
          background.addClass('loaded')
          $('footer aside').addClass('loaded')
        , 1
      
      $('body').append fakeImg.hide()
