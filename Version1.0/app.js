let API_KEY = "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ";

// Background layers
var streetLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox.streets',
    accessToken: API_KEY,
});

var darkLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox.dark',
    accessToken: API_KEY,
});

function buildMap(data, plates) {
    console.log(data);
    console.log(plates);


    // Overlay layers
    function pickColor(mag) {
        if (mag > 6) return 'darkred';
        else if (mag > 4.5) return 'red';
        else if (mag > 2.5) return 'orange';
        else if (mag > 1) return 'yellow';
    }

    function convertPointToCircle (feature, latlng) {
        var mag = feature.properties.mag;
        var radius = mag * 30000;
        var color = pickColor(mag);
        var style = {radius: radius, fillColor: color, opacity: 0, fillOpacity: 0.75};
        return L.circle(latlng, style)
                .bindPopup(`${feature.properties.place} Magnitude: ${mag}`);
    }

    var earthquakes = L.geoJSON(data, {
                            pointToLayer: convertPointToCircle
                        });

    var faultlines = L.geoJSON(plates, {style: {fillOpacity: 0, color: 'grey'}});

    // Map Layers and map defined
    var baseMaps = {'Steet View': streetLayer,
                    'Dark View': darkLayer};

    var overlayMaps = {'Earthquakes': earthquakes,
                       'Faultlines': faultlines};

    var mymap = L.map('map', {
    		'layers': [streetLayer, faultlines, earthquakes]
    	}).setView([40.505, -30], 3);

    // Control top right
    L.control.layers(baseMaps, overlayMaps).addTo(mymap);

    // Legend Part
    var legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = `<p><i style="background:darkred"></i> 6.5+</p>
        				 <p><i style="background:red"></i> 4.5+ </p>
        				 <p><i style="background:orange"></i> 2.5+ </p>
        				 <p><i style="background:yellow"></i> 1+ </p>
                         <p><i style="background:blue"></i> < 1 </p>`;
        return div;
    };

    legend.addTo(mymap);

}

d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json')
   .then(plates => {
        d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
          .then(data => buildMap(data, plates));
});




