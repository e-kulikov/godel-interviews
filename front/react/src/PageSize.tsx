import { PAGE_SIZE } from "./settings.json";

interface PageSizeProps {
  size: number;
  onSetSize: (size: number) => void;
}

export const PageSize = ({ size, onSetSize }: PageSizeProps) => {
  return (
    <div className="page-size">
      <span>Size:</span>
      {PAGE_SIZE.available.map((pageSize) => (
        <button
          key={pageSize}
          disabled={size === pageSize}
          onClick={() => onSetSize(pageSize)}
        >
          {pageSize}
        </button>
      ))}
    </div>
  );
};
