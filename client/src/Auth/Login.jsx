import axios from "axios";

const Login = ({ authorization }) => {
  const login = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const credentials = {
      username,
      password,
    };
    const { data } = await axios.post("/api/auth/login", credentials);
    console.log(data);
    window.localStorage.setItem("token", data.token);
    authorization();
  };
  return (
    <form action={login}>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
