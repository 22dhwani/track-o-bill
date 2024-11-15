import React, { useRef } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../features/api/signupSlice";
import Cookies from "js-cookie";
// Define the UserInfo interface
interface UserInfo {
  firstName: string | null; // Allow null since FormData.get can return null
  lastName: string | null;  // Allow null since FormData.get can return null
  username: string | null;   // Allow null since FormData.get can return null
  email: string | null;      // Allow null since FormData.get can return null
  password: string | null;   // Allow null since FormData.get can return null
  terms: boolean | null;     // Assuming terms is a checkbox, it can be true or false
}
interface SignUpResponse {
  token: string; // Add token property
  // ... other properties if needed
}
  // Function to check if the password and confirm password are correct
  const validatePassword = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string; // Cast to string
    const confirmPassword = formData.get("confirmPassword") as string; // Cast to string

    // Check for empty fields
    if (!password || !confirmPassword) {
        alert("Please fill in both password fields.");
        event.preventDefault();
        return false;
    }

    // Check password strength
    const passwordStrengthRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/; // At least 8 characters, 1 number, 1 special character
    if (!passwordStrengthRegex.test(password)) {
        alert("Password must be at least 8 characters long and include a number and a special character.");
        event.preventDefault();
        return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Password and confirm password do not match");
        event.preventDefault();
        return false;
    }
    return true;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  // Dispatch user data to the slice
  const [signUp] = useSignUpMutation(); // Get the mutation function

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Get form data
    const isValid = validatePassword(event);
    if (!isValid) {
        return;
    }
    const userInfo: UserInfo = {
      firstName: formData.get("firstName") as string | null,
      lastName: formData.get("lastName") as string | null,  
      username: formData.get("username") as string | null,  
      email: formData.get("email") as string | null,        
      password: formData.get("password") as string | null,  
      terms: formData.get("terms") === 'on',
    };

    try {
      // Dispatch user data to the slice and catch the response
      const response = await signUp(userInfo) as unknown as { data: SignUpResponse };
      console.log('Sign up successful:', response);

      Cookies.set('userToken', response?.data?.token, { secure: true, sameSite: "Strict", expires: 7 });
      navigate('/dashboard');
      // Optionally, you can redirect or show a success message here
    } catch (error : any) {
      console.error('Sign up failed:', error.message);
      alert('Sign up failed. Please try again.'); // Show an error message to the user
    }
    // Clear the form fields
    if (formRef.current) {
      formRef.current.reset(); // Reset the form fields
    }
  };

  return (
    <div className="max-h-screen border-4 lg:border-[20px] border-black bg-[#1A1B1C] flex flex-col items-center !overflow-hidden">
      <div className="flex lg:flex-row flex-col h-screen  gap-10  max-h-screen border rounded-2xl border-none w-full">
        <div
          className="lg:w-1/2 h-full bg-cover bg-center  overflow-hidden"
          style={{
            backgroundImage: `url("../../images/split.gif")`,
          }}
        >
          <div className="flex flex-col justify-between h-full p-8 text-white bg-black bg-opacity-30">
            <div>
              <a href="/home" rel="noopener noreferrer">
                <p className="text-2xl libre-bold font-bold mb-2">TrackOBill</p>
              </a>
              <p className="text-lg">Join us and keep track of your bills</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center items-center p-12 rounded-xl text-white">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl font-bold mb-4 ">Create an account</h2>
            <p className="text-gray-400 mb-6">
              Already have an account?{" "}
              <NavLink to="/login" className="text-primaryPurple">
                Log in
              </NavLink>
            </p>

            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              {" "}
              {/* Added onSubmit event */}
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName" // Added name attribute
                  placeholder="First name"
                  className="w-1/2 p-3 rounded bg-gray-800 text-white"
                />
                <input
                  type="text"
                  name="lastName" // Added name attribute
                  placeholder="Last name"
                  className="w-1/2 p-3 rounded bg-gray-800 text-white"
                />
              </div>
              <input
                type="text"
                name="username" // Added name attribute
                placeholder="Username"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                type="email"
                name="email" // Added name attribute
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                type="password"
                name="password" // Added name attribute
                placeholder="Enter your password"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                type="password"
                name="confirmPassword" // Added name attribute
                placeholder="Confirm your password"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mr-2"
                />{" "}
                {/* Added name attribute */}
                <label htmlFor="terms" className="text-gray-400">
                  I agree to the{" "}
                  <a href="#" className="text-primaryPurple">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white w-full py-2 rounded-md mt-4 font-semibold"
              >
                Create account
              </button>
            </form>

            <div className="mt-6 text-center text-gray-400">
              <p>Or register with</p>
              <div className="flex gap-4 justify-center mt-4">
                <button className="flex items-center gap-2 bg-primaryPurple p-2 rounded text-white">
                  <i className="fab fa-google text-2xl"></i>
                  Google
                </button>
                <button className="flex items-center gap-2 bg-primaryPurple p-2 rounded text-white">
                  <i className="fab fa-apple text-2xl"></i>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
