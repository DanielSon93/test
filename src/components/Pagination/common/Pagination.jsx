import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${(props) => (props.$isCurrentPage ? "black" : "white")};
  color: ${(props) => (props.$isCurrentPage ? "white" : "black")};
  cursor: ${(props) => (props.$isCurrentPage ? "default" : "pointer")};
`;

export default function Pagination({ totalItems, itemsPerPage, currentPage, handleCurrentPage }) {
  // 마지막 페이지 번호
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  // 보여줄 버튼 범위
  const btnRange = lastPage < 5 ? lastPage : 5;
  // 보여줄 버튼 범위의 시작 숫자
  const currentSet = Math.ceil(currentPage / btnRange);
  const startPageNum = (currentSet - 1) * btnRange + 1;
  // >, < 버튼 클릭 시 이동 페이지 지정
  const nextPageNum = lastPage <= startPageNum + btnRange ? lastPage : startPageNum + btnRange;
  const prevPageNum = startPageNum - 1 <= 1 ? 1 : startPageNum - 1;

  return (
    <Layout>
      {/* {
        <Button $isFirstPage={currentPage > 1} onClick={() => handleCurrentPage(currentPage - 1)}>
          Prev
        </Button>
      } */}
      {currentPage > 1 && (
        <>
          <Button onClick={() => handleCurrentPage(1)}>&lt;&lt;</Button>
          <Button onClick={() => handleCurrentPage(prevPageNum)}>&lt;</Button>
        </>
      )}
      {Array.from({ length: btnRange }, (_, idx) => (
        <Button
          type="button"
          key={idx}
          $isCurrentPage={idx + startPageNum === currentPage}
          onClick={() => handleCurrentPage(startPageNum + idx)}
        >
          {startPageNum + idx}
        </Button>
      ))}
      {currentPage < lastPage && (
        <>
          <Button onClick={() => handleCurrentPage(nextPageNum)}>&gt;</Button>
          <Button onClick={() => handleCurrentPage(lastPage)}>&gt;&gt;</Button>
        </>
      )}
      {/* {
        <Button $isLastPage={currentPage < lastPage} onClick={() => handleCurrentPage(currentPage - 1)}>
          Prev
        </Button>
      } */}
    </Layout>
  );
}
