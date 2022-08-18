import SendIcon from '@mui/icons-material/Send';

const Newsletter = () => {
  return (
    <div className='h-[60vh] bg-rose-100 flex flex-col items-center justify-center'>
        <h1 className='font-extrabold font-KdamThmorPro text-3xl mb-5'>NEWSLETTER</h1>
        <h1 className='font-KdamThmorPro font-light text-xl mb-3'>Get timely updates from your favourite products.</h1>
        <div className='flex items-center justify-between h-10 bg-white w-[50%] border-4 border-white'>
            <input type="email" placeholder='email' className='border-none flex-[8] h-10 p-1'/>
            <button className='bg-teal-500 h-10 flex-[1] p-0'><SendIcon className=' text-white'/></button>
        </div>
    </div>
  )
}

export default Newsletter