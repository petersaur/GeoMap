console.log('test');

let API_KEY = "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ";

// Backgrounds
var street = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
});

var dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: API_KEY
});


function buildMap(data, plates) {

	function makeCircles(feature, latlng) {
        return L.circleMarker(latlng, {'radius': feature.properties.mag * 3000});
    }

	// Overlays
	var earthquakes = L.geoJSON(data, {pointToLayer: makeCircles});
	var faultlines = L.geoJSON(plates, {'style': {'fillOpacity': 0}});

	// Controls
	var bglayers = {
		'Steet View': street,
		'Dark View': dark
	};

	var overlayLayers = {
		'Earthquakes': earthquakes,
		'Faultlines': faultlines
	};

	// Map
	var mymap = L.map('map',
		{'layers': [street, faultlines, earthquakes]}).setView([40, -30], 3);

	L.control.layers(bglayers, overlayLayers).addTo(mymap);


	// Legend
	var legend = L.control({position: 'bottomleft'});

	legend.onAdd = function (map) {

	    var div = L.DomUtil.create('div', 'info legend');

	    div.innerHTML = `<p><i style="background:darkred"></i>Legend 1</p>
	                     <p><i style="background:red"></i>Legend 2</p>`;

	    return div;
	};

	legend.addTo(mymap);

};

d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json')
   .then(plates => {
        d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
          .then(data => buildMap(data, plates));
});







