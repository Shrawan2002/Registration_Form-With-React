import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormPage({ onSubmit }) {
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    pass: "",
    phonenumber: "",
    country: "india",
    city: "Paris",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "firstname":
      case "lastname":
        if (!value.trim()) {
          errorMsg = `${
            name === "firstname" ? "First name" : "Last name"
          } is required`;
        } else if (/[^a-zA-Z]/.test(value)) {
          errorMsg = "Only alphabetic characters are allowed";
        }
        break;
      case "username":
        if (!value.trim()) {
          errorMsg = "Username is required";
        } else if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
          errorMsg =
            "Username must be 3-16 characters and can contain letters, numbers, and underscores";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMsg = "E-mail is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "E-mail is invalid";
        }
        break;
      case "pass":
        if (!value.trim()) {
          errorMsg = "Password is required";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
            value
          )
        ) {
          errorMsg =
            "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character";
        }
        break;
      case "phonenumber":
        if (!value.trim()) {
          errorMsg = "Phone number is required";
        } else if (!/^\+\d{1,3}\d{7,12}$/.test(value)) {
          errorMsg = "Phone number is invalid (e.g., +911234567890)";
        }
        break;
      case "country":
        if (!value.trim()) {
          errorMsg = "Country is required";
        }
        break;
      case "city":
        if (!value.trim()) {
          errorMsg = "City is required";
        }
        break;
      case "pan":
        if (!value.trim()) {
          errorMsg = "PAN No. is required";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
          errorMsg = "Invalid PAN No. format";
        }
        break;
      case "aadhar":
        if (!value.trim()) {
          errorMsg = "Aadhar No. is required";
        } else if (!/^\d{12}$/.test(value)) {
          errorMsg = "Aadhar No. must be 12 digits";
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  function changeHandler(event) {
    const { name, value } = event.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    let validationErrors = {};
    Object.keys(formdata).forEach((field) => {
      const errorMsg = validateField(field, formdata[field]);
      if (errorMsg) {
        validationErrors[field] = errorMsg;
      }
    });
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formdata);
      navigate("/success");
    } else {
      setErrors(validationErrors);
    }
  }

  useEffect(() => {
    const formIsValid = Object.keys(formdata).every(
      (field) => validateField(field, formdata[field]) === ""
    );
    setIsFormValid(formIsValid);
  }, [formdata]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFE0]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Shrawan"
              autoComplete="off"
              value={formdata.firstname}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.firstname && (
              <p className="text-red-500 text-xs">{errors.firstname}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Kumar"
              autoComplete="off"
              value={formdata.lastname}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.lastname && (
              <p className="text-red-500 text-xs">{errors.lastname}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="SHRAWAN KUMAR"
              autoComplete="off"
              value={formdata.username}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="email@example.com"
              value={formdata.email}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="pass"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="pass"
                id="pass"
                placeholder="*******"
                autoComplete="off"
                value={formdata.pass}
                onChange={changeHandler}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.pass && (
              <p className="text-red-500 text-xs">{errors.pass}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phonenumber"
              id="phonenumber"
              placeholder="+911234567890"
              autoComplete="off"
              value={formdata.phonenumber}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.phonenumber && (
              <p className="text-red-500 text-xs">{errors.phonenumber}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <select
              name="country"
              id="country"
              value={formdata.country}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">UK</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-xs">{errors.country}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <select
              name="city"
              id="city"
              value={formdata.city}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Paris">Paris</option>
              <option value="Mumbai">Mumbai</option>
              <option value="New York">New York</option>
              <option value="London">London</option>
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="pan"
              className="block text-sm font-medium text-gray-700"
            >
              PAN Number
            </label>
            <input
              type="text"
              name="pan"
              id="pan"
              autoComplete="off"
              placeholder="ABCDE1234F"
              value={formdata.pan}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.pan && <p className="text-red-500 text-xs">{errors.pan}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="aadhar"
              className="block text-sm font-medium text-gray-700"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              name="aadhar"
              id="aadhar"
              placeholder="123412341234"
              autoComplete="off"
              value={formdata.aadhar}
              onChange={changeHandler}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.aadhar && (
              <p className="text-red-500 text-xs">{errors.aadhar}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
