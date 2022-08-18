import React from 'react'


const Register = () => {
  return (
    <div className='regiterScreen w-screen h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center'>
        <div className='flex flex-col w-[40%] p-5 bg-white'>
            <h1 className='text-2xl font-bold font-KdamThmorPro'>CREATE AN ACCOUNT</h1>
            <form className='flex flex-wrap'>
                <input type={"text"} placeholder="first name" className='my-1 border-[1px] border-black p-1 flex-1 min-w-[40%] mr-2'/>
                <input type={"text"} placeholder="last name" className='my-1 border-[1px] border-black p-1 flex-1 min-w-[40%]' />
                <input type={"text"} placeholder="username" className='my-1 border-[1px] border-black p-1 flex-1 min-w-[40%] mr-2'/>
                <input type={"email"} placeholder="email" className='my-1 border-[1px] border-black p-1 flex-1 min-w-[40%]' />
                <input type={"password"} placeholder="password" className='my-1 border-[1px] border-black p-1 flex-1 min-w-[40%] mr-2'/>
                <input type={"password"} placeholder="confirm password" className='my-1 border-[1px] border-black p-1 flex-1 min-w-[40%]'/>
                <span className='text-xs'>By creating an account, I consent to the processing of my personal data in accordance with the  <b>PRIVACY POLICY</b></span>
                <button className=' w-[40%] bg-teal-400 text-white cursor-pointer rounded-md'>CREATE ACCOUNT</button>
            </form>
            
        </div>
    </div>
  )
}

export default Register