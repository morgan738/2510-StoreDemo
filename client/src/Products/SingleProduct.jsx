import { useParams } from "react-router";

const SingleProduct = ({ products }) => {
  const { id } = useParams();

  const singleProduct = products.find((product) => {
    return product.id === id;
  });
  if (!singleProduct) {
    return <h4>Loading...</h4>;
  }
  return (
    <div>
      <h2>{singleProduct.name}</h2>
      <p>Price: {singleProduct.price}</p>
    </div>
  );
};

export default SingleProduct;
