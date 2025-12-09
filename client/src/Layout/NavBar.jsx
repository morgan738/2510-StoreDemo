import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/login">Login</Link>
      <Link to="/me">About Me</Link>
    </nav>
  );
};

export default NavBar;
