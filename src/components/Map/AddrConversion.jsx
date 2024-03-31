import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Address from "./common/Address";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Input = styled.input`
  width: 400px;
  padding: 1rem;
  cursor: pointer;
`;

const { kakao } = window;

export default function AddrConversion() {
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleAddress = (address) => {
    setAddress(address);
  };

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    if (address) {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPosition({ latitude: result[0].y, longitude: result[0].x });
        }
      });
    }
  }, [address]);

  return (
    <Layout>
      <Input type="text" value={address} onClick={handleIsModalOpen} readOnly />
      <div>{`${position.latitude} / ${position.longitude}`}</div>

      {isModalOpen && (
        <Address handleIsModalOpen={handleIsModalOpen} handleAddress={handleAddress} />
      )}
    </Layout>
  );
}
