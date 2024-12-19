const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const PMTILES_URL =
  "https://api.protomaps.com/tiles/v4.json?key=3763c973d8ba2e24";
const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);

const mlgl = maplibregl;
const mapSettings = {
  markerMode: false,
  wktMode: false,
};
const map = new mlgl.Map({
  container: "map",
  zoom: 10,
  center: [-95.37172, 29.74344],
  style:
    "https://api.protomaps.com/styles/v4/light/en.json?key=3763c973d8ba2e24",
});

map.on("load", () => {
  updateCenter();
  //const popup = new maplibregl.Popup().setText("-95.37172, 29.74344")
  //const marker = new maplibregl.Marker().setLngLat([-95.37172, 29.74344]).setPopup(popup).addTo(map)
  const tc = TextControl();
  map.addControl(tc, "top-right");
});
map.on("zoomend", () => {
  updateCenter();
});
map.on("moveend", () => {
  updateCenter();
});
map.on("click", (e) => {
  if (mapSettings.markerMode) {
    new maplibregl.Marker()
      .setLngLat(e.lngLat)
      .setPopup(
        new maplibregl.Popup({ closeOnClick: false }).setText(
          e.lngLat.lng + ", " + e.lngLat.lat
        )
      )
      .addTo(map)
      .on("click", (e) => {
        e.preventDefault();
      })
      .togglePopup();
  }
});

const get = (id) => {
  return document.getElementById(id);
};

const updateCenter = () => {
  let loc = map.getCenter();
  document.getElementById("info").innerHTML =
    "Center: " + loc.lng.toFixed(5) + ", " + loc.lat.toFixed(5);
};

const didClickMarkerButton = (e) => {
  mapSettings.markerMode ^= true;
  const el = (e && e.target) || document.getElementById("markerButton");
  if (mapSettings.markerMode) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
};

const didClickWKTButton = (e) => {
  mapSettings.wktMode ^= true;
  const el = get("wktWrapper");
  const button = get("wktButton");
  if (mapSettings.wktMode) {
    //Show WKT input box
    el.classList.remove("d-none");
    button.classList.add("active");
    const wkt = localStorage.getItem("lastWktString");
    if (wkt && wkt.length != null && wkt.length > 0) {
      get("wktInput").value = wkt;
    }
  } else {
    //Hide WKT input box
    el.classList.add("d-none");
    button.classList.remove("active");
  }
};

const didClickUpdateWKTButton = () => {
  const wkt = get("wktInput").value;
  const obj = wellknown.parse(wkt);
  if (map.isSourceLoaded("wktPoly")) {
    map.removeLayer("wktPolyLayer");
    map.removeSource("wktPoly");
  }
  map.addSource("wktPoly", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: obj,
    },
  });
  map.addLayer({
    id: "wktPolyLayer",
    type: "fill",
    source: "wktPoly",
    layout: {},
    paint: {
      "fill-color": "#088",
      "fill-opacity": 0.65,
    },
  });
  const bounds = getBounds(obj);
  map.fitBounds(bounds, { padding: 10 });
  localStorage.setItem("lastWktString", wkt);
};

const getBounds = (geometry) => {
  if (geometry == null || geometry.coordinates == null) {
    return [];
  }
  let [minLng, minLat, maxLng, maxLat] = [
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
  ];
  geometry.coordinates.forEach((ring) => {
    ring.forEach((point) => {
      const lat = point[1];
      const lng = point[0];
      if (lat < minLat) {
        minLat = lat;
      }
      if (lat > maxLat) {
        maxLat = lat;
      }
      if (lng < minLng) {
        minLng = lng;
      }
      if (lng > maxLng) {
        maxLng = lng;
      }
    });
  });
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
};

const didClickClearWKTButton = () => {
  localStorage.setItem("lastWktString", "");
  get("wktInput").value = "";
  map.removeLayer("wktPolyLayer");
};
