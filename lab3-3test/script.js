mapboxgl.accessToken =
  "pk.eyJ1IjoiYzA0MDEyMG1iIiwiYSI6ImNreWtpYWZ4ZTJ3ZjkydnA4YTFkcXVxb3oifQ.Jk2yP5Db0fcp5cHKNuS7OQ";

const map = new mapboxgl.Map({
  container: "map", // container element id
  style: "mapbox://styles/mapbox/light-v10",
  center: [-0.089932, 51.514442],
  zoom: 14
});

//Should point to your own GEOJSON
// const data_url = "https://api.mapbox.com/datasets/v1/your_user_name/your_dataset_ID/features?access_token= your_access_token

const data_url =
  "https://api.mapbox.com/datasets/v1/c040120mb/cl0m784un002i28qku05vq19g/features?access_token=pk.eyJ1IjoiYzA0MDEyMG1iIiwiYSI6ImNreWtpYWZ4ZTJ3ZjkydnA4YTFkcXVxb3oifQ.Jk2yP5Db0fcp5cHKNuS7OQ";

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
      "circle-radius": 10,
      "circle-color": "#eb4d4b",
      "circle-opacity": 0.9
    }
  });

  //Slider interaction code goes below

  //define expressions and filters
  //https://docs.mapbox.com/help/glossary/expression/
  filterType = ["!=", ["get", "Crime type"], "placeholder"];
  filterMonth = ["==", ["get", "Month"], "2021-01"];

  map.setFilter("crimes", ["all", filterMonth, filterType]);

  //Get the current month from the slider
  document.getElementById("slider").addEventListener("input", (event) => {
    const month = parseInt(event.target.value);
    // update the map
    formatted_month = "2021-" + ("0" + month).slice(-2);

    filterMonth = ["==", ["get", "Month"], formatted_month];

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
    map.setFilter("crimes", ["all", filterMonth, filterType]);
  });
});