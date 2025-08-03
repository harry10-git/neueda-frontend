import { useState } from 'react'



function Login() {
  const [count, setCount] = useState(0)

  return (
   <div className='px-10 bg-blue-400'>

      <h1 className='text-3xl text-blue-100'>login</h1>
   </div>
  )
}

export default Login