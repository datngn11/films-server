import React, {useState, useEffect, Profiler} from "react"
import {Route} from "react-router-dom"
import jwtDecode from "jwt-decode"
import TopNavigation from "./TopNavigation"
import {Async, lazyImport} from "./LazyLoad"
import {setAuthorizationHeader} from "../api"

const HomePage = Async(lazyImport("./pages/HomePage"))
const SignUpPage = Async(lazyImport("./pages/SignUpPage"))
const LogInPage = Async(lazyImport("./pages/LogInPage"))
const FilmsPage = Async(lazyImport("./pages/FilmsPage"))

const onRenderFunc = () => {}

const App = () => {
  const [user, setUser] = useState({token: null, role: ""})
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (localStorage.filmsToken) {
      const token = localStorage.filmsToken
      setUser({
        token,
        role: jwtDecode(token).user.role,
      })
    }
  }, [])

  const login = token => {
    setUser({
      token,
      role: jwtDecode(token).user.role,
    })
    setAuthorizationHeader(token)
    localStorage.filmsToken = token
  }

  const logout = props => {
    setUser({token: null, role: "user"})
    setMessage("Goodbye, see you next time")
    setAuthorizationHeader()
    delete localStorage.filmsToken
  }

  return (
    <Profiler id="application" onRender={onRenderFunc}>
      <div className="ui container pt-3">
        <TopNavigation
          isAdmin={user.token && user.role === "admin"}
          isAuth={user.token !== null}
          logout={logout}
        />

        {message && (
          <div className="ui info message">
            <i className="close icon" onClick={() => setMessage("")}></i>
            {message}
          </div>
        )}
        <Route exact path="/" component={HomePage} />
        <Route
          path="/signup"
          render={props => <SignUpPage {...props} setMessage={setMessage} />}
        />
        <Route
          path="/login"
          render={props => (
            <LogInPage {...props} login={login} setMessage={setMessage} />
          )}
        />
        <Route
          path="/films"
          render={props => (
            <FilmsPage
              {...props}
              user={user}
              isAdmin={user.token && user.role === "admin"}
            />
          )}
        />
      </div>
    </Profiler>
  )
}

export default App
