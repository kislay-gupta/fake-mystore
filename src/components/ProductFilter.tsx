import React from "react";

const ProductFilter = ({
  updateRating,
}: {
  updateRating: (e: string) => void;
}) => {
  return (
    <div>
      <div>
        <label
          htmlFor="HeadlineAct"
          className="block text-sm font-medium text-gray-900"
        >
          {" "}
          Sort by{" "}
        </label>

        <select
          name="HeadlineAct"
          id="HeadlineAct"
          className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          onChange={(e) => {
            updateRating(e.target.value);
          }}
        >
          <option value="">Filter</option>
          <option value="">Featured</option>
          <option value="highToLow">Rating(high to low)</option>
          <option value="lowToHigh">Rating(low to high)</option>
          <option value="lowToHighPrice">Price(low to high)</option>
          <option value="highToLowPrice">Price(high to low)</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
