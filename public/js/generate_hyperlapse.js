function generateHyperlapse(origin, destination) {

  var hyperlapseDivWidth = $("#all-hyperlapse").width();

  $("#hyperlapse").empty();

  var hyperlapse = new Hyperlapse(document.getElementById('hyperlapse'), {
    lookat: origin,
    zoom: 1,
    use_lookat: true,
    elevation: 50,
    width: hyperlapseDivWidth,
    height: hyperlapseDivWidth/2
  });

  hyperlapse.onError = function(e) {
    console.log(e);
  };

  hyperlapse.onRouteComplete = function(e) {
    hyperlapse.load();
  };

  hyperlapse.onLoadComplete = function(e) {
    hyperlapse.play();
    $('#hyperlapse').show();
    $('#clear-hyperlapse').show();
    $('#hyperlapse-loading').hide();
  };

  // Google Maps API stuff here...
  var directions_service = new google.maps.DirectionsService();

  var route = {
    request:{
      origin: origin,
      destination: destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }
  };

  directions_service.route(route.request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      hyperlapse.generate( {route:response} );
    } else {
      // console.log(status);
    }
  });

  $('canvas:last').attr("id", "canvas");

  $("#clear-hyperlapse").on("click", function(e) {
    $("#hyperlapse").empty();
    $("#hyperlapse").hide();
    $("#clear-hyperlapse").hide();
  });

}
