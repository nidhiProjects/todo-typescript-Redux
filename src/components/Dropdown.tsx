import React from "react";
import { STATUS } from "../utils/StaticData";
import { DROPDOWN_PROPS } from "../types/Todo";

const Dropdown: React.FC<DROPDOWN_PROPS> = ({ onStatusChange }) => {
  return (
    <>
      <div className="flex justify-end mt-4">
        <select
          id="status"
          className="w-40 mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value={""}>All</option>
          {STATUS.map((item) => (
            <option key={item.value} value={item.value}>
              {item?.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
