---
title: "Dev Maptools"
layout: page
nav: "maptools"
fluid: true
---

<div id="parent">
    <div id="info" class="child"></div>
    <div id="controls" class="child">
        <button id="markerButton" class="button" onclick="didClickMarkerButton(event)">Markers</button>
    </div>
    <div id="map" class="child"></div>
</div>
<link rel='stylesheet' href='https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css' />
<script src='https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js'></script>
<script src="https://unpkg.com/pmtiles@3.0.6/dist/pmtiles.js"></script>
<link rel='stylesheet' href='../css/maptools.css' />
<script src="../js/maptools.js"></script>
