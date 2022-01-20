import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

import iconUser from "../assets/noun-user-3184169.png"

function NavbarBooks() {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img className="d-inline-block align-text-top" src="https://media.istockphoto.com/photos/blue-book-stack-picture-id1290063471?s=612x612" alt="" style={{width:"2rem"}} />
      Home
    </Link>
    <Link className="navbar-brand" to="/book">
      <img className="d-inline-block align-text-top" src="https://media.istockphoto.com/photos/blue-book-stack-picture-id1290063471?s=612x612" alt="" style={{width:"2rem"}} />
      Books
    </Link>


    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    


        <div>
          {loggedInUser.user._id ? (
            <>
              <span>Bem-vindo, {loggedInUser.user.name}</span>

              <button onClick={() => logout()} className="btn btn-link">
                Sair
              </button>
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/login"
            >
              <img src={iconUser} alt="" style={{width: "2rem"}} />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarBooks;
