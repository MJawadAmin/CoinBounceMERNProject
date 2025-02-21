import React, { useState } from 'react';
import TextInput from '../../textinput/TextInput';
import LoginSchema from '../../schemas/LoginSchema';
import { useFormik } from 'formik';
import { login } from '../../../api/internal';
import { setUser } from '../../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
  });

  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password,
    };

    try {
      const response = await login(data);
      console.log("API Response:", response);

      if (response.status === 200) {
        const user = {
          _id: response.data.user._id,
          email: response.data.user.email,
          username: response.data.user.username,
          auth: response.data.user.auth,
        };
        dispatch(setUser(user));
        navigate('/');
        toast.success('Login Successful');
      } else {
        setError(response.response?.data?.errorMessage || "Unknown Error");
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error)
      alert("Error")
      toast.error("Server Error");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl"> Login Page </h1>

      {/* Username Field */}
      <TextInput
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="User Name"
        error={errors.username && touched.username ? 1 : undefined}
      />
      {touched.username && errors.username ? (
        <p className="text-red-500">{errors.username}</p>
      ) : (
        touched.username && <p className="text-green-500">Correct</p>
      )}

      {/* Password Field with Toggle Visibility */}
      <div className="relative w-full max-w-xs">
        <TextInput
          type={showPassword ? "text" : "password"}
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password && touched.password ? 1 : undefined}
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-gray-600 hover:text-gray-800"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} className='mt-10 mr-10' /> : <Eye size={20} className='mt-10 mr-10'  />}
        </button>
      </div>

      {touched.password && errors.password ? (
        <p className="text-red-500">{errors.password}</p>
      ) : (
        touched.password && <p className="text-green-500">Correct</p>
      )}

      {/* Buttons */}
      <button className="p-3 bg-blue-500 border rounded-xl text-white" onClick={handleLogin}>
        Login
      </button>
      <span>
        Don't have an account?{' '}
        <button className="text-green-500" onClick={() => navigate('/signup')}>
          Register
        </button>
      </span>
    </div>
  );
};

export default Login;
