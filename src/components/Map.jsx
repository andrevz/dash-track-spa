import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet/dist/leaflet';
import { useEffect, useState } from 'react';

function Map({ users }) {
  const [mapLayer, setMapLayer] = useState();
  const [markerLayers, setMarkerLayers] = useState([]);

  useEffect(() => {
    const map = L.map('map').setView([-17.370791, -66.18359], 14);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    setMapLayer(map);

    return () => {
      const container = L.DomUtil.get("map");
      if (container) {
        container._leaflet_id = null;
      }
    }
  }, []);

  useEffect(() => {
    removeUserMarkers();
    createUserMarkers(); 
  }, [users]); // eslint-disable-line react-hooks/exhaustive-deps

  function createUserMarkers() {
    if (!mapLayer) {
      return;
    }

    const markers = [];
    for (const user of users) {
      if (!user.lat || !user.long || !user.onFrequency) {
        continue;
      }

      const circle = L.circle([ user.lat, user.long ], {
        color: !user.onFrequency ? 'gray' : (user.status === 1 ? 'red' : 'green'),
        fillColor: 'white',
        fillOpacity: 0.5,
        radius: 70
      }).addTo(mapLayer);

      circle.bindTooltip(`${user.bikeNumber}`, {
        permanent: true,
        direction: 'top',
        className: 'small-tooltip'
      }).openTooltip();

      markers.push(circle);
    }
    setMarkerLayers(markers);
  }

  function removeUserMarkers() {
    if (!mapLayer || !markerLayers) {
      return;
    }

    markerLayers.forEach(marker => mapLayer.removeLayer(marker));
    setMarkerLayers([]);
  }

  return (
    <div id='map' className='w-full h-full z-10'></div>
  );
}

export default Map;
