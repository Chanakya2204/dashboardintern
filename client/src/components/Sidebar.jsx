import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Students", icon: faUserGraduate, path: "/students" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 text-gray-700 p-5 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Dashboard</h2>
      </div>

      <nav className="mb-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link
                to={item.path}
                className="flex items-center text-gray-600 hover:text-green-500"
              >
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-300 pt-4">
        <button
          className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded w-full flex items-center justify-center hover:text-green-500"
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
