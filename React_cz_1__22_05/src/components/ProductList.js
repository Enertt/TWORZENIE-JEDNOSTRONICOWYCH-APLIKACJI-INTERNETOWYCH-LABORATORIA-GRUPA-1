import { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  }, []);

  return (
    <div>
      <h1>List of Products</h1>
      <ul>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            title={product.title}
            brand={product.brand}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
