import React, { useState } from "react";

const Dropdown = ({ listData, setFilteredIndicator, selectDataHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = listData.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setFilteredIndicator(newData)
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredItems = () => {
    // const items = ["Uppercase", "Lowercase", "Camel Case", "Kebab Case"];
    return listData
      .filter((item) => item.name.toLowerCase().includes(searchTerm))
      .map((item, index) => (
        <div
          key={item.key}
          onClick={(e) => {
            selectDataHandler(item.key, listData);
            setIsOpen(false);
          }}
          className="text-sm block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
        >
          {item.name}
        </div>
      ));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative group w-52">
        <button
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          <span className="mr-2">조건식 리스트</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "" : "hidden"
          } absolute right-0 z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
        >
          {/* Search input */}
          <input
            className="text-sm block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder="검색"
            autoComplete="off"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {/* Dropdown content goes here */}
          {filteredItems()}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
