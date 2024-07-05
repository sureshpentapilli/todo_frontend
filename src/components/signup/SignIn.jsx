import React, { useState } from "react"
import "./signup.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../../store"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useNavigate()

  const [Inputs, setInuputs] = useState({
    email: "",
    password: "",
  })

  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const change = (e) => {
    const { name, value } = e.target
    setInuputs({ ...Inputs, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault()
    await axios
      .post("http://localhost:1000/api/v1/signin", Inputs)
      .then((response) => {
        sessionStorage.setItem("id", response.data.others._id)
        dispatch(authActions.login())
        history("/todo")
      })
  }

  return (
    <div>
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 column d-flex justify-content-center align-items-center">
              <div className="card d-flex flex-column  p-5">
                
              
              <h2>WELCOME TO SIGN IN</h2>
              
                <input
                  className="p-2 my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={Inputs.email}
                  onChange={change}
                />
                <div className="password-container">
                  <input
                    className="p-2 my-3 input-signup"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter your Password"
                    value={Inputs.password}
                    onChange={change}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div>
                  <button className="btn-signup p-2" onClick={submit}>
                    Sign In
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
              {/* <h1>
                sign
                <br />
                in
              </h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
