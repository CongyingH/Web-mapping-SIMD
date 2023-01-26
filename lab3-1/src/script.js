// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1Ijoia2V5c21lZml2ZTIyIiwiYSI6ImNsY3FiZXo0czAxeTMzcW5wbWw3b3k5bnkifQ.cvdFR9UScUrboeFuV55qcw";
//Before map
const beforeMap = new mapboxgl.Map({
  container: "before",
  style: "mapbox://styles/keysmefive22/cldd3lsig000n01oa966bts7h",
  center: [-0.089932, 51.514441],
  zoom: 14
});

//After map
const afterMap = new mapboxgl.Map({
  container: "after",
  style: "mapbox://styles/keysmefive22/cldcy8jet006a01p530jcsjwc",
  center: [-0.089932, 51.514441],
  zoom: 14
});

const container = "#comparison-container";
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {});

