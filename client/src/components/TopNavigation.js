import React from "react"
import {NavLink, Link} from "react-router-dom"
import PropTypes from "prop-types"

const TopNavigation = ({isAuth, logout, isAdmin}) => {
  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        Home
      </NavLink>
      <NavLink to="/films" className="item">
        Films
      </NavLink>
      {isAdmin && (
        <NavLink to="/films/new" className="item">
          <i className="icon plus"></i>
          Add new film
        </NavLink>
      )}
      <div className="right menu">
        {isAuth ? (
          <Link to="/" onClick={logout} className="item">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="item">
              Sign in
            </Link>
            <Link to="/signup" className="item">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

TopNavigation.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
}

export default TopNavigation
