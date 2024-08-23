import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSignup from "../custom_hooks/signup_function";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, loading, error, success } = useSignup(
    "http://127.0.0.1:8000/signup/"
  );

  const onSubmit = async (formData) => {
    await signup(formData);
    if (success) {
      navigate("/");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("profile_picture", file);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="First name"
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && <p>{errors.first_name.message}</p>}

        <input
          type="text"
          placeholder="Last name"
          {...register("last_name", { required: "Last name is required" })}
        />
        {errors.last_name && <p>{errors.last_name.message}</p>}

        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type="file"
          {...register("profile_picture")}
          onChange={handleFileChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Signup successful!</p>}
    </div>
  );
};

export default SignupForm;

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     password: "",
//     profile_picture: null,
//   });

//   const navigate = useNavigate();

//   const { signup, loading, error, success } = useSignup(
//     "http://127.0.0.1:8000/signup/"
//   );

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(formData);
//     if (success) {
//       navigate("/");
//     }
//   };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//           placeholder="First name"
//           required
//         />
//         <input
//           type="text"
//           name="last_name"
//           value={formData.last_name}
//           onChange={handleChange}
//           placeholder="Last name"
//           required
//         />
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
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
//         <input
//           type="file"
//           name="profile_picture"
//           value={formData.profile_picture}
//           onChange={handleChange}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Signing up..." : "Sign Up"}
//         </button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>Signup successful!</p>}
//     </div>
//   );
// };

// export default SignupForm;
