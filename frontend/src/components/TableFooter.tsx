import React, { useEffect } from "react";
import styles from "../../styles/TableFooter.module.css";

type TableFooterProps<DataType> = {
  slice: Array<DataType>;
  range: number[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const TableFooter = <T,>({
  slice,
  range,
  page,
  setPage,
}: TableFooterProps<T>) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < range[range.length - 1]) {
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.tableFooter}>
      <button
        className={`${styles.button} ${
          page === 1 ? styles.inactiveArrowButton : styles.activeArrowButton
        }`}
        onClick={handlePrevPage}
      >
        <h1>{"<"}</h1>
      </button>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
      <button
        className={`${styles.button} ${
          page === range[range.length - 1]
            ? styles.inactiveArrowButton
            : styles.activeArrowButton
        }`}
        onClick={handleNextPage}
      >
        <h1 className="!font-bold">{`>`}</h1>
      </button>
    </div>
  );
};

export default TableFooter;
