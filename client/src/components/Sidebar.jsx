import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserGraduate } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Students", icon: faUserGraduate, path: "/students" }, // Path for students page
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
      {/* ... (Header section - Logo or Title) */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Dashboard</h2>
      </div>

      <nav className="mb-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link // Use Link for navigation within the app
                to={item.path}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full flex items-center justify-center"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;