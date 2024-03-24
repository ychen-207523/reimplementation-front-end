import { Column } from "@tanstack/react-table";
import React, { useCallback } from "react";
import DebouncedInput from "./DebouncedInput";

/**
 * @author Ankur Mundra on May, 2023
 */

interface FilterProps {
  column: Column<any>;
  // add dropdownOptions parameter
  dropdownOptions?: string[];
}

const ColumnFilter: React.FC<FilterProps> = ({ column, dropdownOptions }) => {
  const [filterValue, setFilterValue] = [column.getFilterValue() ?? "", column.setFilterValue];
  const searchHandler = useCallback(
    (value: string | number) => setFilterValue(value),
    [setFilterValue]
  );
  // if the dropdownOptions is not empty, the page will show the dropdown layout.
  if (dropdownOptions) {
    return (
      <select
        className="w-75"
        onChange={(e) => searchHandler(e.target.value)}
        value={filterValue.toString()}
      >
        <option value="">All</option>
        {dropdownOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <DebouncedInput
        className="w-75"
        onChange={searchHandler}
        value={filterValue}
        placeholder="Search"
      />
    );
  }
};

export default ColumnFilter;
