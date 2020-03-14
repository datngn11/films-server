import React from "react"
import {Route, Redirect} from "react-router-dom"

const AdminRoute = ({user, render, ...props}) => (
  <Route
    {...props}
    render={props =>
      user.token && user.role === "admin" ? (
        render(props)
      ) : (
        <Redirect to="/films" />
      )
    }
  />
)

export default AdminRoute
