import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "./common/Pagination";
import usePagination from "./hooks/usePagination";

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

const SelectBox = styled.select`
  margin-bottom: 100px;
`;

export default function OffsetPagination() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentPage, itemsPerPage, currentItems, handleCurrentPage, handleItemsPerPage } =
    usePagination(items);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      await fetch("/data/data.json")
        .then((res) => res.json())
        .then((data) => setItems(data));
      setIsLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <>
      <SelectBox value={itemsPerPage} onChange={(e) => handleItemsPerPage(+e.target.value)}>
        {optionsPerPage && optionsPerPage.map((option, idx) => <option key={idx}>{option}</option>)}
      </SelectBox>
      <Grid>
        {isLoading ? (
          <div>Loading Items...</div>
        ) : (
          currentItems?.map((item) => <GridItem key={item.id}>{item.title}</GridItem>)
        )}
      </Grid>
      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
      />
    </>
  );
}

const optionsPerPage = [10, 15, 30, 50, 100];
