import React from "react";
import ProductListingWrapper from "../screens/product/list/ProductListingWrapper";
import CategoryHighlights from "../screens/navbar/CategoryHighlights";
import PurchaseImpact from "../MyComponent/PurchaseImpact";
const StationaryHome = () => {
  return (
    <div>
      <CategoryHighlights />
      <ProductListingWrapper />
      <PurchaseImpact />
      {/* You can add more sections or components here as needed */}
    </div>
  );
};

export default StationaryHome;
