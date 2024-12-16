const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const PMTILES_URL =
  "https://api.protomaps.com/tiles/v4.json?key=3763c973d8ba2e24";
const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);

const mlgl = maplibregl;
const mapSettings = {
  markerMode: false,
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
    //didClickMarkerButton();
  }
});

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
