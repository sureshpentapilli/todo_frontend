import React, { useState } from "react"
import "./signup.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const histroy = useNavigate()

  const [Inputs, setInuputs] = useState({
    email: "",
    username: "",
    password: "",
  })

  const change = (e) => {
    const { name, value } = e.target
    setInuputs({ ...Inputs, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault()
    await axios
      .post("http://localhost:1000/api/v1/register", Inputs)
      .then((response) => {
        if (response.data.message === "user already existed") {
          alert(response.data.message)
        } else {
          alert(response.data.message)
          setInuputs({
            email: "",
            username: "",
            password: "",
          })
          histroy("/signin")
        }
      })
  }

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="card d-flex flex-column p-5">
              <h2>WELCOME TO SIGN UP</h2>
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={change}
                value={Inputs.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="username"
                name="username"
                placeholder="Enter your Username"
                onChange={change}
                value={Inputs.username}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your Password"
                onChange={change}
                value={Inputs.password}
              />
              <div>
                <button onClick={submit} className="btn-signup p-2">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
            {/* <h1>
              sign
              <br />
              up
            </h1> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
