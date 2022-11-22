import styles from "./login.module.css";
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.module.css";
import HeadPage from "../../components/HeadPage/HeadPage";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/login";
      const res = await axios.post(url, data);
      localStorage.setItem("user", JSON.stringify(res.data));
      history.push("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  console.log(error)

  return (
    <div className={styles.container}>
      <HeadPage />
      <section className={styles.container_position}>
        <div className={styles.login_container}>
          <div className={styles.login_container_title}>
            <Link
              to="/register"
              style={{ textDecoration: "none" }}
            >
              <h2 className={styles.title}>New Here?</h2>
            </Link>
          
            <Link to="/register" style={{ textDecoration: "none" }}>
                <p className={styles.subtitle}>Sing up</p>
              </Link>
            
          </div>

          <div className={styles.container_form}>
            <h1 className={styles.form_title}>Login to Your Account</h1>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />

              <button type="submit" className={styles.green_btn}>
                Sing In
              </button>
              
            </form>

            {error&& <div><p>{error}</p></div>}
          </div>
        </div>
       
      </section>
    </div>
  );
};

export default Login;
