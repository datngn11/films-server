import React from "react"
import LoginForm from "../forms/LoginForm"
import api from "../../api"

const LogInPage = props => {
  const submit = credentials =>
    api.users.login(credentials).then(token => {
      props.login(token)
      props.setMessage("Login successful. Welcome!")
      props.history.push("/")
    })

  return (
    <div className="ui grid centered">
      <div className="eight wide column">
        <LoginForm submit={submit} />
      </div>
    </div>
  )
}

export default LogInPage
