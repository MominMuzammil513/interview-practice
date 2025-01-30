// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold mb-4 text-white">Welcome to My App</h1>
//       <div>
//         <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Login</Link>
//         <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sign Up</Link>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">Welcome, {user?.firstName}!</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;