let API_KEY = "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ";

// Background layers
var streetLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 3,
    id: 'mapbox.streets',
    accessToken: API_KEY,
});

var darkLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 3,
    id: 'mapbox.dark',
    accessToken: API_KEY,
});

// Overlay layers
var earthquakes = L.layerGroup();
earthquakes.addLayer(L.circle([40.505, -80], {radius: 100000}));
earthquakes.addLayer(L.marker([40.505, -60]));
earthquakes.addLayer(L.marker([40.505, -70]));
earthquakes.addLayer(L.marker([40.505, -90]));


var arr = [L.marker([60.505, -85]), L.marker([60.505, -75]), L.marker([60.505, -65])];
var earthquakes2 = L.layerGroup(arr);

// Map Layers and map defined
var baseMaps = {'Steet View': streetLayer,
                'Dark View': darkLayer};

var overlayMaps = {'Earthquakes 1': earthquakes,
                   'Earthquakes 2': earthquakes2};

var mymap = L.map('map', {
		'layers': [streetLayer, earthquakes, earthquakes2]
	}).setView([40.505, -30], 3);

// Control top right
L.control.layers(baseMaps, overlayMaps).addTo(mymap);

// Legend Part
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `<p><i style="background:red"></i> legend1</p>
    				 <p><i style="background:green"></i> legend2 </p>
    				 <p><i style="background:blue"></i> legend3 </p>
    				 <p><i style="background:yellow"></i> legend4 </p>`;
    return div;
};

legend.addTo(mymap);



