import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/signupSlice";
import Cookies from "js-cookie";

// Define the UserInfo interface
interface UserCredentials {
  email: string | null; // Allow null since FormData.get can return null
  password: string | null; // Allow null since FormData.get can return null
}
interface LoginResponse {
  token: string; // Add token property
  email: string | null; // Allow null since FormData.get can return null
  password: string | null; // Allow null since FormData.get can return null
}
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const formRef = useRef<HTMLFormElement>(null);
  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Get form data
    const userInfo: UserCredentials = {
      email: formData.get("email") as string | null, // Type assertion
      password: formData.get("password") as string | null, // Type assertion
    };
    console.log(userInfo); // Log user info or handle it as needed

    try {
      // Dispatch user data to the slice and catch the response
      const response = (await login(userInfo)) as unknown as {
        data: LoginResponse;
      };
      console.log("Sign up successful:", response);

      Cookies.set("userToken", response?.data?.token, {
        secure: true,
        sameSite: "Strict",
        expires: 7,
      });
      navigate("/home/dashboard");
      // Optionally, you can redirect or show a success message here
    } catch (error: any) {
      console.error("Sign up failed:", error.message);
      alert("Sign up failed. Please try again."); // Show an error message to the user
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
            backgroundImage: `url("../../images/87rS.gif")`,
            backgroundPosition: "cover",
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
            <h2 className="text-4xl font-bold mb-4 ">Log In</h2>
            <p className="text-gray-400 mb-6">
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-primaryPurple">
                Sign Up
              </NavLink>
            </p>

            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              {" "}
              {/* Added onSubmit event */}
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
              {/* <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mr-2"
                />{" "}
                <label htmlFor="terms" className="text-gray-400">
                  I agree to the{" "}
                  <a href="#" className="text-primaryPurple">
                    Terms & Conditions
                  </a>
                </label>
              </div> */}
              <button
                type="submit"
                className="bg-green-600 text-white w-full py-2 rounded-md mt-4 font-semibold"
              >
                Create account
              </button>
            </form>

            <div className="mt-6 text-center text-gray-400">
              <p>Or If you don't have an account register here</p>
              <div className="flex gap-4 justify-center mt-4">
                <NavLink to="/signup">
                  <button className="flex items-center gap-2 bg-primaryPurple p-2 rounded text-white">
                    {/* <i className="fab fa-google text-2xl"></i> */}
                    Sign Up
                  </button>
                </NavLink>
                {/* <button className="flex items-center gap-2 bg-primaryPurple p-2 rounded text-white">
                  <i className="fab fa-apple text-2xl"></i>
                  Apple
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
