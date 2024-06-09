import React from "react";
import { useSelector } from "react-redux";
import Product from "../Components/Product";
import { getAllProducts, getLoadingState, getProductError } from "../Slices/ProductsReducer";

export default function Home() {
  const productsList = useSelector(getAllProducts);
  // console.log(productsList)
  const isLoading = useSelector(getLoadingState);
  const error = useSelector(getProductError);
  // console.log(error)

  return (
    <>
      {isLoading ? (
        <h2 style={{ textAlign: "center", color: "red",marginTop:"35vh",fontSize:"big"}}>Loading...</h2>
      ) : (
        <div className="products-container">
          {productsList.map(({ id, title, rating, price, image }) =>
            isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <Product
                key={id}
                productId={id}
                title={title}
                rating={rating}
                price={price}
                imageUrl={image}
              />
            )
          )}
        </div>
      )}
      {error && (
        <div
          className="error-message"
          style={{ textAlign: "center", color: "red" }}
        >
          <h1>{error}</h1>
        </div>
      )}
    </>
  );
}
