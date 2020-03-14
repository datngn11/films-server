import React from "react"
import SignUpForm from "../forms/SignUpForm"
import api from "../../api"

const SignUpPage = props => {
  const submit = user =>
    api.users.create(user).then(() => {
      props.setMessage("User successfully created")
      props.history.push("/login")
    })

  return (
    <div className="ui grid centered">
      <div className="eight wide column">
        <SignUpForm submit={submit} />
      </div>
    </div>
  )
}

export default SignUpPage
