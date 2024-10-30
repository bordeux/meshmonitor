import * as React from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { useDebounceEffect } from "ahooks";

export interface PositionData {
  zoom: number;
  lat: number;
  long: number;
}

interface MapEventsProps {
  onPositionChanged?: (e: PositionData) => void;
}

const MapEvents: React.FC<MapEventsProps> = ({ onPositionChanged }) => {
  const [position, setPosition] = useState<PositionData | null>();
  const map = useMap();

  useMapEvents({
    move: () => {
      const center = map.getCenter();
      setPosition({
        zoom: map.getZoom(),
        lat: center.lat,
        long: center.lng,
      });
    },
  });

  useDebounceEffect(
    () => {
      if (position && onPositionChanged) {
        onPositionChanged(position);
      }
    },
    [position],
    {
      wait: 300,
    },
  );

  return null;
};

export default MapEvents;
