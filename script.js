


//Define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoiemd5NjY3NyIsImEiOiJjbGRtMHNzd2owNHJ1M3hxZmw0MTFkNnY3In0.G3OzgVvqC8WutLmLNhjGXw'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

//Initialize map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-105, 58],
    zoom: 3,
    maxBounds: [
        [-180, 30], // Southwest
        [-25, 84]  // Northeast
    ]
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "cn" //Try searching for places inside and outside of canada to test the geocoder
    })
);


// https://raw.githubusercontent.com/zgy6677/newlab3/main/Newmap3.geojson

//Add data source and draw initial visiualization of layer
map.on('load', () => {

    //Use GeoJSON file as vector tile creates non-unique IDs for features which causes difficulty when highlighting polygons
    map.addSource('toronto', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/zgy6677/newlab3/main/Newmap3.geojson', //Link to raw github files when in development stage. Update to pages on deployment
    });

    //Add layer only once using case expression and feature state for opacity
    map.addLayer({
        'id': 'toronto-fill',
        'type': 'fill',
        'source': 'toronto',
        'paint': {
            'fill-color': '#fbb03b',
            'fill-opacity': 0.5, //CASE and FEATURE STATE expression sets opactity as 0.5 when hover state is false and 1 when updated to true
            'fill-outline-color': 'blue'
        }
       
    });

});

//Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());






map.on('mouseenter', 'toronto-fill', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over provterr-fill layer
});

map.on('mouseleave', 'toronto-fill', () => {
    map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves provterr-fill layer
    //map.setFilter("provterr-hl",['==', ['get', 'PRUID'], '']);
});


map.on('click', 'toronto-fill', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML("<b>PartofToronto:</b> " + e.features[0].properties.PRENAME + "<br>" +
            "Population: " + e.features[0].properties.POP2021 + "<br>" +
            "EU Origin:" + e.features[0].properties.euorigin + "<br>" +
            "Asia Origin:" + e.features[0].properties.asiaorigin) //Use click event properties to write text for popup
        .addTo(map); //Show popup on map
})


