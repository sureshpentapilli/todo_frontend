import React, { useState, useEffect } from "react"
import "./todo.css"
import TodoCards from "./TodoCards"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Update from "./Update"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { authActions } from "../../store"

import axios from "axios"

let id = sessionStorage.getItem("id")
let toUpdateArray = [];

const Todo = () => {
  const [Inputs, setInuputs] = useState({ title: "", body: "" })
  const [Array, setArray] = useState([])

  const show = () => {
    document.getElementById("textarea").style.display = "block"
  }

  const change = (e) => {
    const { name, value } = e.target
    setInuputs({ ...Inputs, [name]: value })
  }

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("title or body should not be empty")
    } else {
      if (id) {
        await axios
          .post("http://localhost:1000/api/v2/addTask", {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response)
          })

        setInuputs({ title: "", body: "" })
        toast.success("your task is added")
      } else {
        setArray([...Array, Inputs])
        setInuputs({ title: "", body: "" })
        toast.success("your task is added")
        toast.error("your task in not saved ! please signup")
      }
    }
  }

  const del = async (Cardid) => {
    if (id) {
      await axios
        .delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, {
          data: { id: id },
        })
        .then(() => {
          toast.success("your task is deleted")
        })
    } else {
      toast.error("please signup first")
    }
  }

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value
  }


  const update = (value)=>{
    toUpdateArray = Array[value];
  }

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`http://localhost:1000/api/v2/getTasks/${id}`)
          .then((response) => {
            setArray(response.data.list)
          })
      }
      fetch()
    }
  }, [submit])

  // console.log(Array)
  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main-container d-flex justify-content-center align-items-center my-4 flex-column top-margin">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="TEXT"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              className="p-2 todo-inputs"
              name="body"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              ADD
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div> 
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} update={toUpdateArray}/>
        </div>
      </div>
    </>
  )
} 

export default Todo
