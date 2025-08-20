import React from "react";
import { Star, StarHalf, Plus, Minus, Heart } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({
  item,
  quantities,
  wishlist,
  handleQuantityChange,
  toggleWishlist,
  addToCart,
  setSelectedProduct,
  isAddingToCart,
  isTogglingWishlist,
}) => {
  const quantity = quantities[item.id] || 1;
  const discountedPrice = (
    item.price *
    (1 - (item.discount || 0) / 100)
  ).toFixed(2);
  const discountPercent = item.discount || 0;

  return (
    <div
      className="relative bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col cursor-pointer group"
      onClick={() => setSelectedProduct(item)}
    >
      {item.discount && (
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-md rounded-tr-md z-10 animate-pulse">
          {discountPercent}% OFF
        </span>
      )}

      <button
        className={`absolute top-2 right-2 bg-white p-1 rounded-full z-10 hover:bg-red-100 ${
          isTogglingWishlist[item.id] ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={(e) => toggleWishlist(e, item.id)}
        disabled={isTogglingWishlist[item.id]}
        aria-label={
          wishlist[item.id]
            ? `Remove ${item.name} from wishlist`
            : `Add ${item.name} to wishlist`
        }
      >
        {wishlist[item.id] ? (
          <Heart className="text-red-500 fill-red-500" size={18} />
        ) : (
          <Heart className="text-gray-400" size={18} />
        )}
      </button>

      <img
        src={item.image || "/default-image.png"}
        alt={`Image of ${item.name}`}
        loading="lazy"
        className="w-full h-36 object-cover bg-gray-50 rounded-md"
      />

      <div className="mt-3 flex-grow flex flex-col justify-between">
        <div>
          <span>{item._id}</span>
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded ml-2">
            {item.category || "General"}
          </span>
          <h2 className="mt-1 text-sm font-semibold text-gray-800 truncate">
            {item.name}
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">
              ₹{discountedPrice}
            </span>
            {item.discount && (
              <span className="text-xs text-gray-400 line-through">
                ₹{item.price}
              </span>
            )}
          </div>
          {/* <div className="flex items-center mt-1 text-yellow-400">
            {Array.from({ length: 4 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" stroke="none" />
            ))}
            <StarHalf size={14} fill="currentColor" stroke="none" />
          </div> */}
          <div className="flex items-center mt-1"> 
            <span className="text-yellow-500">{item.discount} %  </span> <p> proposed by {item.organizedBy}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(item.id, -1);
              }}
              className="p-1 border rounded hover:bg-gray-100"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-semibold">{quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(item.id, 1);
              }}
              className="p-1 border rounded hover:bg-gray-100"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item.id, quantity);
            }}
            disabled={isAddingToCart[item.id]}
            aria-label={`Add ${item.name} to cart`}
            className={`flex items-center gap-2 bg-red-500 text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-red-600 transition-transform duration-200 hover:scale-105 ${
              isAddingToCart[item.id] ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddingToCart[item.id] ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <>
                <FaShoppingCart size={16} /> 
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
