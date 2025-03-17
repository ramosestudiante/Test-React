import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="bg-blue-400 p-5 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo o título del Navbar */}
        <div className="text-white text-xl font-bold">
          <span>Test Front React</span>
        </div>

        {/* Contenedor para alinear los enlaces a la derecha */}
        <div className="flex gap-4 ml-auto text-white">
          <Link to={'/'}>Inicio</Link>
          <Link to={'/favorites'}>Favoritos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
