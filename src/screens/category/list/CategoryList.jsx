import React from "react";

const CategoryList = ({ categories }) => {
  if (!categories.length) {
    return <p>No categories available</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Category List</h2>
      <ul className="list-disc pl-6">
        {categories.map((cat) => (
          <li key={cat._id}>{cat.categoryname}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
