


//Define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoiemd5NjY3NyIsImEiOiJjbGRtMHNzd2owNHJ1M3hxZmw0MTFkNnY3In0.G3OzgVvqC8WutLmLNhjGXw'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

//Initialize map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-105, 58],  // lang lati 
    zoom: 3,
    maxBounds: [
        [-180, 30], // Southwest
        [-25, 84]  // Northeast
    ],
});


// https://raw.githubusercontent.com/zgy6677/newlab3/main/map.geojson?token=GHSAT0AAAAAAB73XHSCDPGNFNMJH4THB7RQZAPODJQ


//Add data source and draw initial visiualization of layer
map.on('load', () => {

    //Use GeoJSON file as vector tile creates non-unique IDs for features which causes difficulty when highlighting polygons
    map.addSource('toronto', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/zgy6677/newlab3/main/map.geojson', //Link to raw github files when in development stage. Update to pages on deployment
    });

    //Add layer only once using case expression and feature state for opacity
    map.addLayer({
        'id': 'toronto-fill',
        'type': 'fill',
        'source': 'toronto',
        'paint': {
            'fill-color': '#627BC1',
            'fill-opacity': 0.5, //CASE and FEATURE STATE expression sets opactity as 0.5 when hover state is false and 1 when updated to true
            'fill-outline-color': 'white'
        }
       
    });

});
