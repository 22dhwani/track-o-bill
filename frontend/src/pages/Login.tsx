import { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 border-4 lg:border-[20px]  border-black">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-2">
          Sign in with email
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Make a new doc to bring your money and groups together. Save more.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
