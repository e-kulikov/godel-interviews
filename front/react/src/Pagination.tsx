interface PaginationProps {
  pageNumber: number;
  onSetPage: (page: number) => void;
}

export const Pagination = ({ pageNumber, onSetPage }: PaginationProps) => {
  return (
    <div className="pagination">
      <button onClick={() => onSetPage(pageNumber - 1)}>&lt; Previous</button>
      <button onClick={() => onSetPage(pageNumber + 1)}>Next &gt;</button>
    </div>
  );
};
