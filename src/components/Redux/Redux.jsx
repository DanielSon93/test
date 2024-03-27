import React from "react";
import styled from "styled-components";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { darkModeActions } from "./store/isDarkMode";

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  color: var(--color-font);
`;

const Todos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background-color: var(--color-bg);
  border-radius: 1rem;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-header);

  > svg {
    cursor: pointer;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  list-style: none;
  padding: 1rem;
`;

export default function Redux() {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const dispatch = useDispatch();

  const handleDarkMode = () => {
    dispatch(darkModeActions.toggleDarkMode());
  };

  return (
    <Layout>
      <Todos>
        <Header>
          <h3>Todos</h3>
          {isDarkMode ? (
            <IoMdMoon onClick={handleDarkMode} />
          ) : (
            <IoMdSunny onClick={handleDarkMode} />
          )}
        </Header>
        <List>
          {todos.map((todo, idx) => (
            <li key={idx}>{todo}</li>
          ))}
        </List>
      </Todos>
    </Layout>
  );
}

const todos = ["집 청소", "설거지", "음식물쓰레기 버리기", "화장실 청소", "바닥 청소"];
