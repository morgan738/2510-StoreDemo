import { Link } from "react-router";

const Products = ({ products }) => {
  return (
    <div>
      <h1>Products - {products.length}</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
