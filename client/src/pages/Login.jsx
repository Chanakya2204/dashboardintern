import { useState } from "react";
import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/students");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Get started
          </a>
        </p>
        {error && (
          <p className="text-red-500 text-center font-medium py-2">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="hello@gmail.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-all"
          >
            Sign in
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Forgot password?
          <a href="#" className="text-indigo-500 hover:underline ml-1">
            Reset
          </a>
        </p>
        <div className="flex justify-center items-center mt-6">
          <span className="text-gray-500 text-sm">OR</span>
        </div>
        <div className="flex justify-evenly mt-4">
          <button className="border rounded-full p-3 flex items-center">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Google
          </button>
          <button className="border rounded-full p-3 flex items-center">
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            Github
          </button>
          <button className="border rounded-full p-3 flex items-center">
            <FontAwesomeIcon icon={faTwitter} className="mr-2" />
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
}
