import React from "react"
import "./Home.css"
const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 style={{color:"white"}}>welcome</h1>
        <button className="home-btn p-2">
            Make to do list
        </button>
      </div>
    </div>
  )
}

export default Home
