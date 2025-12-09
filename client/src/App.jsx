import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router";
import Products from "./Products/Products";
import Layout from "./Layout/Layout";
import SingleProduct from "./Products/SingleProduct";
import Login from "./Auth/Login";
import AboutMe from "./Auth/AboutMe";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  const authorization = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get("/api/auth/me", {
        headers: {
          authorization: token,
        },
      });
      setUser(data);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Products products={products} />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route
            path="/products/:id"
            element={<SingleProduct products={products} />}
          />
          <Route
            path="/login"
            element={<Login authorization={authorization} />}
          />
          <Route path="/me" element={<AboutMe user={user} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
