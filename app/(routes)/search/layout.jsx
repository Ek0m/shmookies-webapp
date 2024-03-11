import React from "react";
import CategorySideBar from "./_components/CategorySideBar";

export default function layout({ children }) {
  return (
    <div>
      <div className="grid  grid-cols-1 md:grid-cols-4 mt-12">
        <div className=" hidden md:block">
            <CategorySideBar />
        </div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
