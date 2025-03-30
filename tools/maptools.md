---
title: "Dev Maptools - WKT Viewer, latitude/longitude finder & more"
description: "WKT Viewer, latitude and longitude finder & plus more mapping tools"
layout: page
nav: "maptools"
fluid: true
---

<div id="parent">
    <div id="info" class="child"></div>
    <div id="controls" class="child">
        <div>Mode:</div>
        <button id="btnMarker" class="btn btn-outline-primary" onclick="didClickMarkerButton(event)">Marker</button>
        <button id="btnWKT" class="btn btn-outline-primary" onclick="didClickWKTButton(event)">WKT</button>
        <button id="btnGeoJSON" class="btn btn-outline-primary" onclick="didClickGeoJSONButton(event)">GeoJSON</button>
        <div class="form-group d-none" id="wktWrapper">
          <label for="strInput">Type in your WKT/GeoJSON:</label>
          <textarea rows="10" id="strInput" class="form-control"></textarea>
          <div class="mt-3">
            <button class="btn btn-primary" onclick="didClickUpdateWKTButton()">Update</button>
            <button class="btn btn-danger" onclick="didClickClearWKTButton()">Clear</button>
          </div>
        </div>
    </div>
    <div id="map" class="child"></div>
</div>
<link rel='stylesheet' href='https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css' />
<script src='https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js'></script>
<script src="https://unpkg.com/pmtiles@3.0.6/dist/pmtiles.js"></script>
<link rel='stylesheet' href='../css/maptools.css' />
<script src="../js/wellknown.js"></script>
<script src="../js/maptools.js"></script>
