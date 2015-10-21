var prev_infoWindow = false;
var listOfMarkers = [];

var googlePlacesMarkers = [];

function createGPMarker(place, map) {

  var lat=place.geometry.location.lat();
  var lng=place.geometry.location.lng();

  var icon_to_use;
  var iconBase = "../images/places/";

  var rating = hasRating(place);
  var starRating = rateStar(rating);
  var name = place.name
  // console.log(place)
  var placeType = place.types[0];


  placeType = removeUnderscore(placeType);
  placeType = capitalizeFirstLetter(placeType);

  var openNow = isOpen(place);

  var contentString = "<div class='infoWindowContent'> <p>Name: " + name + "</p>"
    + "<p>Rating: " + rating + "<span class='stars'> " + starRating + "</span>" + "</p>"
    + "<p>Open: " + openNow + "</p>"
    + "<p>Type of Establishment: " + placeType + "</p></div>"
  // var image = {
  //   size: new google.maps.Size(42, 68),
  // };
  var busMarkerImage = iconBase + 'busstop.png';
  var bankMarkerImage = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=dollar|FFFF00');
  var groceryMarkerImage = iconBase + 'supermarket.png';
  var salonMarkerImage = iconBase + 'barber.png';
  var restMarkerImage = iconBase + 'burger.png';
  var coffeeMarkerImage = iconBase + 'coffee.png';
  var storeMarkerImage = iconBase + "mall.png";
  var pharmacyMarkerImage = iconBase + 'medicalstore.png';
  var barMarkerImage = iconBase + 'bar.png';
  var bakeMarkerImage = iconBase + 'bread.png';

  if (place.types.indexOf('salon') != -1) {
    icon_to_use = salonMarkerImage;
  } if (place.types.indexOf('bank') != -1) { icon_to_use = bankMarkerImage;
  } if (place.types.indexOf('grocery_or_supermarket') != -1) {
    icon_to_use = groceryMarkerImage;
  } if (place.types.indexOf('restaurant') != -1) {
    icon_to_use = restMarkerImage;
  } if (place.types.indexOf('cafe') != -1) {
    icon_to_use = coffeeMarkerImage;
  } if (place.types.indexOf('pharmacy') != -1) {
    icon_to_use = pharmacyMarkerImage;
  } if (place.types.indexOf('store') != -1) {
    icon_to_use = storeMarkerImage;
  }
  // if (place.types.indexOf('bus_station') != -1) {
  //   icon_to_use = busMarkerImage;
  // }
    if (place.types.indexOf('bar') != -1) {
    icon_to_use = barMarkerImage;
  } if (place.types.indexOf('bakery') != -1) {
    icon_to_use = bakeMarkerImage;
  }

  var markerP = new google.maps.Marker({
    map: map,
    position: {lat: lat, lng: lng},
    title: name,
    icon: icon_to_use,
  });
  googlePlacesMarkers.push(markerP);

  // Create infowindow for street view

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  markerP.addListener('click', function() {
    if (prev_infoWindow) {
      prev_infoWindow.close();
    };
    infoWindow.open(map.getStreetView(), markerP);
    prev_infoWindow = infoWindow;
  });
}

function isOpen (place){
  if (place.opening_hours) {
    if (place.opening_hours.open_now) {
      return "Place is open."
    } else {
      return "Place is closed."
    };
   } else {
    return "Info not provided."
  }
};

function hasRating (place) {
  if (place.rating) {
    return place.rating
  } else {
    return "Has not been rated."
  }
}

function rateStar (rating) {
  if (isNaN(rating)) return " ";

  var val = rating
  var size = Math.max(0, (Math.min(5, val))) * 16;
  var $span = $('<span />').width(size);
  return $span.prop('outerHTML');
}


function removeUnderscore(string) {
 return string.replace(/_/g, " ");
}

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}