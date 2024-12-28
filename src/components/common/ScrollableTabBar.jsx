import React, { useState } from "react";

const ScrollableTabBar = ({ tabs, onTabClick, activeTabIndex }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap border-b">
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(index)}
            className={`py-2 text-sm rounded-t-md ${
              activeTabIndex === index
                ? "border-b-2 border-nelsa_primary text-nelsa_primary font-semibold"
                : "text-neutral-500 hover:text-nelsa_primary"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollableTabBar;
