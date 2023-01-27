// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2V5c21lZml2ZTIyIiwiYSI6ImNsY3FiZXo0czAxeTMzcW5wbWw3b3k5bnkifQ.cvdFR9UScUrboeFuV55qcw";

const map = new mapboxgl.Map({
  container: "map", // container element id
  style: "mapbox://styles/mapbox/light-v10",
  center: [-0.089932, 51.514442],
  zoom: 14
});

const data_url =
  "https://api.mapbox.com/datasets/v1/keysmefive22/clddiqmcb0h5028qwuw5vgqv1/features?access_token=pk.eyJ1Ijoia2V5c21lZml2ZTIyIiwiYSI6ImNsY3FiZXo0czAxeTMzcW5wbWw3b3k5bnkifQ.cvdFR9UScUrboeFuV55qcw"; //将csv数据通过这个链接转化成了GeoJSN数据，太advanced了

//直接用代码render 链接进来的GeoJSN数据
//Everything will go into this map.on ()
map.on("load", () => {
  //Style the marker as circles, note in the source property, the data is using data_url from above.
  map.addLayer({
    id: "crimes",
    type: "circle",
    source: {
      type: "geojson",
      data: data_url //point to the data url variable
    },
    paint: {
      //feel free to adjust these
      "circle-radius": 5,
      "circle-color": "#c0392b",
      "circle-opacity": 0.5
    }
  });

  //Slider interaction code goes below

  //define expressions and filters
  //https://docs.mapbox.com/help/glossary/expression/
  filterType = ["!=", ["get", "Crime type"], "placeholder"];
  filterMonth = ["==", ["get", "Month"], "21-01"];

  map.setFilter("crimes", ["all", filterMonth, filterType]);

  //Get the current month from the slider
  document.getElementById("slider").addEventListener("input", (event) => {
    const month = parseInt(event.target.value);
    // update the map
    formatted_month = "21-" + ("0" + month).slice(-2); //这一段看不懂

    filterMonth = ["==", ["get", "Month"], formatted_month];

    //map.setFilter() method reference:  https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setfilter.

    map.setFilter("crimes", ["all", filterMonth, filterType]);

    // update text in the UI
    document.getElementById("active-month").innerText = month;
  });

  //Radio button interaction code goes below
  document.getElementById("filters").addEventListener("change", (event) => {
    //Get the  value from the activated radio button
    const type = event.target.value;
    //You can check the returned type in the console.
    console.log(type);
    // update the map filter
    if (type == "all") {
      filterType = ["!=", ["get", "Crime type"], "placeholder"];
    } else if (type == "shoplifting") {
      filterType = ["==", ["get", "Crime type"], "Robbery"];
    } else if (type == "bike") {
      filterType = ["==", ["get", "Crime type"], "Bicycle theft"];
    } else {
      console.log("error");
    }

    //Set the filter
    map.setFilter("crimes", ["all", filterMonth, filterType]); //知道之前为什么要设置filterType但是又是all的原因了，为了这一步可以让单独类型的案件也随时间显示。
    //设置两种filter方式，所以在radio以后也可以随案件类型显示crime在当前
  });

  map.on("mousemove", (event) => {
    const dpoint = map.queryRenderedFeatures(event.point, {
      layers: ["crimes"]
    });
    document.getElementById("pd").innerHTML = dpoint.length
      ? `<h3>${dpoint[0].properties.type}</h3><p>Rank: <strong>${dpoint[0].properties.Percentv2}</strong> %</p>`
      : `<p>Hover over a crime point!</p>`;
  }); //怎么显示某一个属性如果column label有空格
});