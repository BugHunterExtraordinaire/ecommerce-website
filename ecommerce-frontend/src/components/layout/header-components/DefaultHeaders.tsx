import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function DefaultHeaders() {

  const navigate = useNavigate();

  async function logout() {
    try {
      await axios.post('http://localhost:3000/api/v1/users/logout', {}, {
        withCredentials: true
      });
      navigate('/login');
    } catch (error) {
      return error;
    }
  }

  return (
    <header className="px-4 flex justify-between items-center w-full h-15 text-(--font-color) bg-(--bg-color)">
      <h1 className="text-3xl font-bold">ProShop</h1>
      <nav className="flex gap-5 items-center text-1xl">
        <Link to='/'>Home</Link>
        <Link to='/orders'>Orders</Link>
        <Link to='/checkout'><i className="fa-solid fa-cart-shopping"><span className="">{}</span></i></Link>
        <i className="fa-solid fa-arrow-right-from-bracket hover:cursor-pointer" onClick={logout}></i>
      </nav>
    </header>
  );
}