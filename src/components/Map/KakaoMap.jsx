import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export default function KakaoMap() {
  const [maps, setMaps] = useState([]);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    fetch("/data/map.json")
      .then((res) => res.json())
      .then((data) => setMaps(data));

    // 현재 내 위치 받아오기
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      (error) => console.error(error)
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <Layout>
      <Map
        center={{ lat: position.latitude, lng: position.longitude }} // 지도 초기 화면
        style={{ width: "360px", height: "360px" }} // 지도 스타일링
        level={3} // 지도 확대
      >
        {maps.map((map, idx) => (
          <div key={idx}>
            <Circle
              center={{
                lat: map.latitude,
                lng: map.longitude,
              }}
              radius={50}
              strokeWeight={4} // 선(두께)
              strokeColor={"#ff8f65"} // 선(색)
              strokeOpacity={1} // 선(불투명도 0~1)
              strokeStyle={"dash"} // 선(스타일)
              fillColor={"#ffd45b"} // 채우기(색)
              fillOpacity={0.5} // 채우기(불투명도)
            />
            <MapMarker
              position={{ lat: map.latitude, lng: map.longitude }}
              image={{
                src: "/assets/image/marker.png",
                size: {
                  width: 35,
                  height: 35,
                },
              }}
            ></MapMarker>
          </div>
        ))}
        <MapMarker
          position={{ lat: position.latitude, lng: position.longitude }}
          image={{
            src: "/assets/image/currentMarker.png",
            size: {
              width: 20,
              height: 20,
            },
          }}
        ></MapMarker>
      </Map>
    </Layout>
  );
}
