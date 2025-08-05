import React from 'react'
import ProductListingWrapper from '../screens/product/list/ProductListingWrapper'
import CategoryListWrapper from '../screens/category/list/CategoryListWrapper'
import CategoryHighlights from '../screens/navbar/CategoryHighlights'
const StationaryHome = () => {
  return (
    <div>
        <CategoryHighlights />
      <ProductListingWrapper />
    </div>
  )
}

export default StationaryHome
