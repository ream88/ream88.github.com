# ### Google Analytics
# I don't like the standard snippet for Google Analytics.
googleAnalyticsID = 'UA-22268484-1'
window._gaq = [['_setAccount', googleAnalyticsID], ['_trackPageview']]


# ### Flickr Backgrounds
# Use a random photo by [Mark Sebastian](http://www.flickr.com/photos/markjsebastian) as background.
$ ->
  base_uri = 'http://api.flickr.com/services/rest'
  
  # These params are included in each request.
  # Be sure to pass `nojsoncallback: '1'`, otherwise Flickr doesn't allow me to use `$.getJSON`.
  default_params =
    api_key: '1d73ab087336342b9684547967c62f3d'
    nojsoncallback: '1'
  
  # Params we need for [Flickr](http://www.flickr.com/services/api/flickr.photosets.getPhotos.html).
  params = $.extend default_params,
    format:         'json'
    media:          'photos'
    method:         'flickr.photosets.getPhotos'
    photoset_id:    '72157594229974265'
  
  # Load all photos from the desired photostream.
  # The limit is **500**, but this is ok since the photostream does only have 150+ photos.
  $.getJSON base_uri, params, (response) ->
    photos = response.photoset.photo
    
    # Choose a random photo.
    photo = photos[Math.floor Math.random() * photos.length]
    
    # Get all sizes of this photo from [Flickr](http://www.flickr.com/services/api/flickr.photos.getSizes.html).
    params = $.extend default_params,
      method:   'flickr.photos.getSizes'
      photo_id: photo.id
    
    # Load the photo sizes
    $.getJSON base_uri, params, (response) ->
      sizes = response.sizes.size
      
      # We need large (which is the next to last), cause original is too big for mobile connections.
      photo = sizes[sizes.length - 2]
      
      # Add a fake image element, so we can use its `load` event to display the picture after fully loaded.
      fakeImg = $ '<img>', src: photo.source
      fakeImg.load ->
        # The image got loaded, add a `<div id="background">` and set its `background-image` property.
        background = $ '<div>', id: 'background'
        $('body').prepend background.css('background-image': "url(#{photo.source})")
        
        # We need to use a callback, since WebKit-based browsers ignore the transitions defined on the `<div id="background">` element.
        setTimeout ->
          # Show the div and a footer to attribute Mark Sebastian.
          background.addClass('loaded')
          $('footer aside').addClass('loaded')
        , 1
      
