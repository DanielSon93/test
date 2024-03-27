import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;

  a {
    text-decoration: none;
    color: black;
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: 1rem;
    list-style: none;
  }

  .active {
    font-size: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  border: 1px solid black;
`;

export default function CursorPagination() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPage = (e) => {
    const itemsPerPage = +e.target.value;
    setItemsPerPage(itemsPerPage);
    const lastPage = Math.ceil(items.length / itemsPerPage);
    if (currentPage > lastPage) handleCurrentPage(lastPage);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const lastPage = Math.ceil(totalItems / itemsPerPage);
      const skip = (currentPage - 1) * 10;
      const limit = currentPage === lastPage ? totalItems % itemsPerPage : itemsPerPage;

      await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data.products);
          setTotalItems(data.total);
        });
      setIsLoading(false);
    };

    fetchItems();
  }, [currentPage, itemsPerPage, totalItems]);

  return (
    <Layout>
      <select value={itemsPerPage} onChange={handleItemsPerPage}>
        {optionsPerPage && optionsPerPage.map((option, idx) => <option key={idx}>{option}</option>)}
      </select>
      <Grid>
        {!isLoading && items.length > 0 ? (
          items?.map((item) => <GridItem key={item.id}>{item.title}</GridItem>)
        ) : (
          <div>Loading Items...</div>
        )}
      </Grid>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        pageRangeDisplayed={5}
        totalItemsCount={totalItems}
        firstPageText={"<<"}
        lastPageText={">>"}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handleCurrentPage}
      />
    </Layout>
  );
}

const optionsPerPage = [10, 15, 30, 50, 100];
