import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/apiCalls";

const Login = () => {
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const {isFetching , error} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    try {
      login(dispatch, {username , password})
      navigate("/")
    } catch (error) {
      alert("something went wrong")
    }
    
  }
  return (
    <div className="loginScreen w-screen h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="flex flex-col w-[30%] p-5 bg-white items-center">
        <h1 className="text-2xl font-bold font-KdamThmorPro text-center">
          SIGN IN
        </h1>
        <form className="flex flex-col w-[80%]">
          <input
            type={"text"}
            placeholder="username"
            className="my-1 border-[1px] border-black p-1 min-w-[70%]"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type={"password"}
            placeholder="password"
            className="my-1 border-[1px] border-black p-1 min-w-[70%]"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={isFetching} onClick={handleLogin} className= {`${isFetching ? "cursor-not-allowed" :  "cursor-pointer" } w-[40%] bg-teal-700 text-white p-2`}>
            LOGIN
          </button>

          {
            error && <span className="text-red-600">Something went wrong....</span>
          }

          <a href="/forgotPassword">Forgot password?</a>
          <a href="/register">Create new account</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
