import { useState } from "react";

export default function usePagination(items) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const firstItemIdx = (currentPage - 1) * itemsPerPage;
  const lastItemIdx = firstItemIdx + itemsPerPage;
  const currentItems = items.slice(firstItemIdx, lastItemIdx);

  // 현재 페이지 지정
  const handleCurrentPage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  // 한 페이지에 보여줄 아이템 수 지정
  const handleItemsPerPage = (limit) => {
    setItemsPerPage(limit);
    const lastPage = Math.ceil(items.length / limit);
    if (currentPage > lastPage) handleCurrentPage(lastPage);
  };

  return {
    currentPage,
    itemsPerPage,
    currentItems,
    handleCurrentPage,
    handleItemsPerPage,
  };
}
