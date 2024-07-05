import React from "react"
import { MdDeleteForever } from "react-icons/md"
import { MdModeEditOutline } from "react-icons/md"

import "./todo.css"

const TodoCards = ({ title, body, id, delid, display ,updateId,toBeUpdate}) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h1>{title}</h1>
        <p className="todo-card-p">{body.split("", 70)}...</p>
      </div>
      <div className="d-flex justify-content-between">
        <div
          d-flex
          justify-content-center
          align-items-center
          card-icon-head
          px-2
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => {
            display("block")
            toBeUpdate(updateId)
          }}
        >
          <MdModeEditOutline className="card-icons" />
          update
        </div>
        <div
          d-flex
          justify-content-center
          align-items-center
          card-icon-head
          px-2
          text-danger
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            delid(id)
          }}
        >
          <MdDeleteForever className="card-icons" />
          Delete
        </div>
      </div>
    </div>
  )
}

export default TodoCards
