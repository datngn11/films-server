import React, {useState} from "react"
import setDataObj from "../FormUtils"

const initialData = {
  email: "",
  password: "",
}

const LoginForm = props => {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const errors = validate(data)
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      setIsLoading(true)
      props.submit(data).catch(error => {
        setErrors(error.response.data.errors)
        setIsLoading(false)
      })
    }
  }

  const validate = data => {
    const errors = {}
    if (!data.email) errors.email = "Email cannot be blank"
    if (!data.password) errors.password = "Password cannot be blank"

    return errors
  }
  const loadClass = isLoading ? "loading" : ""
  return (
    <form className={`ui form ${loadClass}`} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="ui segment">
        <div className={errors.email ? "error field" : "field"}>
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input
              type="email"
              name="email"
              placeholder="E-mail address"
              value={data.email}
              onChange={setDataObj(data, setData)}
            />
          </div>
        </div>
        <div className={errors.password ? "error field" : "field"}>
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={setDataObj(data, setData)}
            />
          </div>
        </div>
        <button className="ui fluid large teal button">Login</button>
      </div>

      <div className="ui error message"></div>
    </form>
  )
}
export default LoginForm
