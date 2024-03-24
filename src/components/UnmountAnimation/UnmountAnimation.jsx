import React, { useRef, useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  font-weight: bold;
  font-size: 2rem;
  border: 1px solid black;
  transition: all 1s;
  opacity: ${(props) => {
    switch (props.$state) {
      case "entering":
        return "1";
      case "entered":
        return "1";
      case "exiting":
        return "0";
      case "exited":
        return "0";
    }
  }};
`;

export default function UnmountAnimation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nodeRef = useRef(null);

  return (
    <>
      <button type="button" onClick={() => setIsModalOpen((prev) => !prev)}>
        Open?
      </button>
      <Transition nodeRef={nodeRef} in={isModalOpen} timeout={1000}>
        {(state) => (
          <Modal ref={nodeRef} $state={state}>
            Modal Transition
          </Modal>
        )}
      </Transition>
    </>
  );
}
