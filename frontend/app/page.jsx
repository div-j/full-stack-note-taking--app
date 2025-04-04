import Link from 'next/link'
import React from 'react'
import Header from './Header'

export default function Home() {
  return (
        <section>
          <Header/>
              <div className='flex flex-col items-center justify-center h-[80vh] text-center '>
          
                <div>
          
                <h1 className='text-3xl font-bold'>Welcome To you Personal <span className='text-blue-500 '>NoteTaking</span> App</h1>
                <p className='text-gray-500 text-sm mt-4'><Link className='text-white font-bold bg-black py-1 px-4 rounded-md ' href={'/login'}>Login</Link> to start taking notes</p>
                </div>
              </div>
        </section>
  )
}
