import { React, useEffect, useState } from "react";
import MapGoogle from "../components/mapGoogle";

export default function Home() {
  const [markers, setMarkers] = useState([{ id: "-1" }]);
  const [areas, setAreas] = useState([{ id: "-1" }]);

  useEffect(() => {
    fetch("/api/areas")
      .then((res) => res.json())
      .then((data) => {
        let arrAreas = data.map((area) => {
          let path = [];
          area.lat.forEach((lat) => {
            path[path.length] = { lat: lat, lng: area.lng[path.length] };
          });
          return {
            id: area.area_id,
            name: area.area_name,
            path: path,
          };
        });
        setAreas(arrAreas);
      })
      .catch((err) => console.error(err));

    fetch("/api/sensors")
      .then((res) => res.json())
      .then((data) => {
        let arrSensors = data.map((sensor) => ({
          id: sensor.id,
          position: { lat: sensor.lat, lng: sensor.lng },
          title: sensor.title,
        }));
        setMarkers(arrSensors);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>My Map Application</h1>
      <MapGoogle markers={markers} areas={areas} />
    </main>
  );
}
