import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const Layout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  z-index: 1500;
  box-shadow: 1px 1px 20px -5px rgba(0, 0, 0, 0.75);
`;

const CloseBtn = styled.button`
  width: 100%;
  padding: 1rem 0;
  background-color: black;
  font-size: 1rem;
  color: white;
  cursor: pointer;
`;

export default function Address({ handleIsModalOpen, handleAddress }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    handleAddress(fullAddress);
    handleIsModalOpen();
  };

  return (
    <Layout>
      <DaumPostcode onComplete={handleComplete} />
      <CloseBtn onClick={handleIsModalOpen}>Close</CloseBtn>
    </Layout>
  );
}
