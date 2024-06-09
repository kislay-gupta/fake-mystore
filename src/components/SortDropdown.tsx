interface SortDropdownProps {
  sortCriteria: string;
  handleSortChange: (value: string) => void;
}

const SortDropdown = ({
  sortCriteria,
  handleSortChange,
}: SortDropdownProps) => {
  return (
    <div>
      <label
        htmlFor="HeadlineAct"
        className="block text-sm font-medium text-gray-900"
      >
        {" "}
        Sort by{" "}
      </label>

      <select
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        onChange={(e) => handleSortChange(e.target.value)}
        value={sortCriteria}
      >
        <option value="">Sort By</option>
        <option value="lowToHighPrice">Price: Low to High</option>
        <option value="highToLowPrice">Price: High to Low</option>
        <option value="lowToHigh">Rating: Low to High</option>
        <option value="highToLow">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
