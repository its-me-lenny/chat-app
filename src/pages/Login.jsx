import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signInHandler = async (data, event) => {
    event.preventDefault();
    const email = data.email;
    const password = data.password;

    /**
     * These are the way to fetch form data without react hook form
     * const email = event.target[0].value;
     * const password = event.target[1].value;
     */

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chilla Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit(signInHandler)}>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <small>Email is required</small>
          )}
          {errors.email?.type === "pattern" && <small>Not a valid email</small>}
          <input
            type="password"
            {...register("password", {
              required: true,
              // More strict validation for password
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
            })}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <small>Password is required</small>
          )}
          <button>Log in</button>
          {error && <small>Something went wrong</small>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
