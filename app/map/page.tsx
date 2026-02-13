'use client';
import { useCallback, useEffect, useState } from 'react';
import { Map, MapControls, useMap } from '@/components/ui/map';
import { Button } from '@/components/ui/button';
import { Layers, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

import geojsonData from '@/lib/sampleData';

function CustomLayer() {
  const { map, isLoaded } = useMap();
  const [isLayerVisible, setIsLayerVisible] = useState(true);
  const [hoveredPark, setHoveredPark] = useState<string | null>(null);

  const addLayers = useCallback(() => {
    if (!map) return;
    // Add source if it doesn't exist
    if (!map.getSource('parks')) {
      map.addSource('parks', {
        type: 'geojson',
        data: geojsonData
      });
    }

    // Add fill layer if it doesn't exist
    if (!map.getLayer('parks-fill')) {
      map.addLayer({
        id: 'parks-fill',
        type: 'fill',
        source: 'parks',
        paint: {
          'fill-color': '#22c55e',
          'fill-opacity': 0.4
        },
        layout: {
          visibility: isLayerVisible ? 'visible' : 'none'
        }
      });
    }

    // Add outline layer if it doesn't exist
    if (!map.getLayer('parks-outline')) {
      map.addLayer({
        id: 'parks-outline',
        type: 'line',
        source: 'parks',
        paint: {
          'line-color': '#16a34a',
          'line-width': 2
        },
        layout: {
          visibility: isLayerVisible ? 'visible' : 'none'
        }
      });
    }
    // Add outline layer if it doesn't exist
    if (!map.getLayer('parks-circle')) {
      map.addLayer({
        id: 'parks-circle',
        type: 'circle',
        source: 'parks',
        paint: {
          'circle-radius': 2,
          'circle-color': '#FF0000'
        },
        layout: {
          visibility: isLayerVisible ? 'visible' : 'none'
        }
      });
    }
  }, [map, isLayerVisible]);

  useEffect(() => {
    if (!map || !isLoaded) return;

    // Add layers on mount
    addLayers();

    return () => {};
  }, [map, isLoaded, isLayerVisible]);

  return <></>;
}

export type MapPageProps = {};

export default function MapPage(props: MapPageProps) {
  return (
    <Card className="h-svh p-0 overflow-hidden">
      <Map center={[-35.74569, -9.6352]} zoom={8}>
        <MapControls />
        <CustomLayer />
      </Map>
    </Card>
  );
}
