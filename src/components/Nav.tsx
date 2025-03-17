import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="bg-blue-400 p-5 shadow-md">
      <div className=" flex justify-between items-center">
        <div className="flex-1">
          <span className="text-white text-xl font-bold">Test Front React</span>
        </div>

        <div className="flex gap-5 text-white ml-auto">
          <Link to={"/"}>Inicio</Link>
          <Link to={"/favorites"}>Favoritos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
