"use client"
import { Notebook, NotebookPen, NotebookText, Plus, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Dropdown from './Dropdown'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNote } from '@/app/_context/noteContext'
import { motion } from 'framer-motion'

export default function Sidebar() {
  const { setSearchInput, user } = useNote()
  return (
    <motion.section
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className='fixed h-screen mt-4 ml-5 p-5 bg-white w-64 rounded-lg'
    >
      <div>
        <section className='flex items-center gap-x-2'>
          <span className='bg-black text-white p-2 rounded-lg'>
            <NotebookPen size={30} />
          </span>
          <h1 className='text-xl text-black'>NotePlus</h1>
        </section>
        <hr className='my-4' />
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img src='https://api.dicebear.com/9.x/avataaars/svg' width={40} height={40} className='rounded-xl' />
            <h1 className='text-xs'>{user?.name}</h1>
          </div>
          <Dropdown />
        </div>
        <section className='flex gap-2 items-center rounded-xl bg-slate-200 p-2 mt-4'>
          <Search size={20} />
          <input
            className='w-full bg-transparent focus:outline-none text-xs text-gray-700'
            placeholder='Search'
            onChange={(e) => setSearchInput(e.target.value)}
            name='search'
          />
        </section>
        <div className='flex items-center gap-2 py-2 rounded-lg mt-4 pl-2 bg-black text-white'>
          <Plus size={15} className='' />
          <button className='text-sm'>Add Note</button>
        </div>
        <div className='mt-5 flex items-center gap-2 text-gray-700 text-sm'>
          <NotebookText />
          <p>Your Notes</p>
        </div>
      </div>
    </motion.section>
  )
}
