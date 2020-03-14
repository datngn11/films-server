import React from "react"
import {Link} from "react-router-dom"
import isEmail from "validator/lib/isEmail"
import equals from "validator/lib/equals"
import FormMessage from "./FormMessage"

const initialData = {
  email: "",
  password: "",
  passwordConfirm: "",
}

class SignUpForm extends React.Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
  }
  handleChange = ({target}) =>
    this.setState({
      data: {...this.state.data, [target.name]: target.value},
      errors: {...this.state.errors, [target.name]: ""},
    })

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({errors})

    if (Object.keys(errors).length === 0) {
      this.setState({loading: true})
      this.props
        .submit(this.state.data)
        .catch(error =>
          this.setState({errors: error.response.data.errors, loading: false}),
        )
    }
  }

  validate(data) {
    const errors = {}
    if (!isEmail(data.email)) errors.email = "Email is not valid"
    if (!data.email) errors.email = "Email is required"

    if (!data.password) errors.password = "Password is required"
    if (!equals(data.password, data.passwordConfirm))
      errors.passwordConfirm = "Password do not match"

    return errors
  }

  render() {
    const {data, errors, loading} = this.state
    const loadingClass = loading ? "ui form loading" : "ui form"
    return (
      <form className={loadingClass} onSubmit={this.handleSubmit}>
        <div className={errors.email ? "error field" : "field"}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email address"
            value={data.email}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.email}</FormMessage>
        </div>

        <div className={errors.password ? "error field" : "field"}>
          <label>Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            value={data.password}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.password}</FormMessage>
        </div>

        <div className={errors.passwordConfirm ? "error field" : "field"}>
          <label>Password Confirmation</label>
          <input
            type="text"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Password confirmation"
            value={data.passwordConfirm}
            onChange={this.handleChange}
          />
          <FormMessage>{errors.passwordConfirm}</FormMessage>
        </div>

        <div className="ui fluid buttons">
          <button className="ui button green">Sing Up</button>

          <Link to="/" className="ui red button">
            Cancel
          </Link>
        </div>
      </form>
    )
  }
}

export default SignUpForm
