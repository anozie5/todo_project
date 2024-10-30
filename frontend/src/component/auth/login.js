import React from "react";
import { useForm } from "react-hook-form";
import useLogin from "../custom_hooks/login_function";
// import { useNavigate } from "react-router-dom";
//import { ToastContainer } from "react-toastify";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate();
  const { login, fetchProtectedData, loading, error } = useLogin(
    "http://127.0.0.1:8000/login/"
  );

  const onSubmit = async (formData) => {
    const success = await login(formData);
    if (success) {
      const data = await fetchProtectedData("http://127.0.0.1:8000/todo/");
      console.log("Protected Data:", data);

      // you can undo this
      // navigate("/todo");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const { login, loading, error, success } = useLogin("http://127.0.0.1:8000/");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(formData);

//     if (success) {
//       navigate("/todo");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>Login successful!</p>}
//       <ToastContainer />
//     </div>
//   );
// };

// export default LoginForm;
