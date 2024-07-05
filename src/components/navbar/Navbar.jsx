import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {  useDispatch } from "react-redux"
import { authActions  } from "../../store"
import { useNavigate } from "react-router-dom"


import "./Navbar.css"
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const dispatch = useDispatch()
  const history = useNavigate()

  const logout = () => {
    sessionStorage.clear("id")
    dispatch(authActions.logout())
    history("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>TODO</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/">
                 <b>Home</b> 
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  <b>About us</b>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todo"
                >
                  <b>Todo</b>
                </Link>
              </li>

              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="signup"
                    >
                     <b>Sign Up</b> 
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signin"
                    >
                      <b>Sign In</b>
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item mx-2" onClick={logout}>
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="#"
                    >
                      logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
