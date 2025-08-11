import React from "react";
import OurReachListing from "./OurReachListing";
import { useGetAllOurReachQuery } from "../../slice/OurReachApiSlice ";

const OurReachWrapper = () => {
  // OurReachWrapper.jsx
  const { data: reachData, isLoading, isError } = useGetAllOurReachQuery();
  const reach =
    reachData?.data?.map((item) => ({
      ...item,
      icon:
        item.icon && item.icon.trim() !== ""
          ? `https://tbtdj99v-3300.inc1.devtunnels.ms/uploads/${item.icon}`
          : "https://via.placeholder.com/100x100.png?text=No+Icon",
    })) || [];

  console.log(reachData, "reachData");
  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load data</p>
    );
  }

  return <OurReachListing reach={reach} />;
};

export default OurReachWrapper;
