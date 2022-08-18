import React from 'react'

const CatogeryItem = ({item}) => {
  return (
    <div className='flex-1 m-3 h-[70vh] bg-black relative'>
    <img src={item.img} className="w-full h-full object-cover" alt=''/>
        <div className='absolute w-full h-full top-0 flex items-center justify-center flex-col'>
            <h1 className='text-white text-2xl font-extrabold font-KdamThmorPro'>{item.title}</h1>
            <button className='p-1 w-44 rounded-lg text-xl font-semibold font-KdamThmorPro bg-white text-gray-800 cursor-pointer mt-4 '>SHOP NOW</button>
        </div>
    </div>
  )
}

export default CatogeryItem