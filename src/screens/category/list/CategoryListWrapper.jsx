import React from "react";
import CategoryList from "./CategoryList";
import { useGetAllCategoryQuery } from "../../../slice/CategoryApiSlice";

const CategoryListWrapper = () => {
  const { data, isLoading, isError } = useGetAllCategoryQuery();
console.log(data,'data')
  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Failed to load categories</p>;

  return <CategoryList categories={data?.data || []} />;
};

export default CategoryListWrapper;
