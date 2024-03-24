import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 21px -5px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 2px 21px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 21px -5px rgba(0, 0, 0, 0.75);
`;

const ItemImg = styled.img`
  width: 300px;
  height: 200px;
`;

const ItemTitle = styled.h3`
  margin-top: 1rem;
`;

const ItemDescription = styled.p`
  margin-top: 0.3rem;
`;

export default function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const lastItemRef = useRef(null);

  useEffect(() => {
    // 새로운 데이터 조회
    const fetchMoreItems = async () => {
      const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10}`).then(
        (res) => res.json()
      );

      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    // 관찰자 지정
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) fetchMoreItems();
    });

    if (observer && lastItemRef.current) observer.observe(lastItemRef.current);

    // 클린업
    return () => {
      if (observer) observer.disconnect();
    };
  }, [page, hasMore]);

  return (
    <>
      {items.map((item) => (
        <ItemCard key={item.id}>
          <ItemImg src={item.thumbnail} alt={item.title} />
          <ItemTitle>{item.title}</ItemTitle>
          <ItemDescription>{item.description}</ItemDescription>
        </ItemCard>
      ))}

      {hasMore && <div ref={lastItemRef}>Load More Items...</div>}
    </>
  );
}

/*
  <문제점>
  가장 하단까지 스크롤을 해야지 새로운 데이터가 fetch 된다.
  fetch 시간이 크게 길지는 않지만 UX적인 측면에서 중간이 조금 넘었을 때 fetch 되는 방식이 필요해 보인다.
  ex) 넷플릭스, 당근마켓

  <개선할 점>
  Custom Hook으로 별도로 관리해서 다른사람도 사용할 수 있도록 만들어야 할 것 같다.
*/
