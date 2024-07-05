import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const Update = ({ display, update }) => {
  useEffect(() => {
    setInuputs({
      title: update.title,
      body: update.body,
    })
  }, [update])

  const [Inputs, setInuputs] = useState({
    title: "",
    body: "",
  }) 

  const change = (e) => {
    const { name, value } = e.target
    setInuputs({ ...Inputs, [name]: value })  
  }
  const submit = async () => {
    await axios
      .put(`http://localhost:1000/api/v2/updateTask/${update._id}`, Inputs)
      .then((response) => {
        toast.success(response.data.message)
        display("none")
      })
  }

  return (
    <div className="p-5 bg-primary d-flex justify-content-center align-items-start flex-column update">
      <h3>update your task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={Inputs.title}
        name="title"
        onChange={change}
      />
      <textarea
        className="todo-inputs  w-100 p-3"  
        value={Inputs.body}
        name="body"
        onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => {
            display("none")
          }}
        >
          close
        </button>
      </div>
    </div>
  )
}

export default Update
