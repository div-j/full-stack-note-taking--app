import { Cake, CalendarDays, Edit, Ellipsis, Pencil, Pin, Trash, User } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

export default function NoteCard({ data, cardDelete, onEdit }) {
  const [show, setShow] = React.useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-80 h-[28rem] shadow-lg shadow-gray rounded-lg p-4 flex flex-col gap-y-4 border-b-4 border-purple-400 animate-in justify-between'
    >
      <section className='flex items-center justify-between'>
        <div className='border-2 rounded-lg p-2 w-15 border-purple-400 hover:border-white'>
          <Cake className='text-purple-400' size={30} />
        </div>
        <div className='flex items-center gap-2 relative cursor-pointer p-2 rounded-md hover:border-2' onClick={() => setShow(!show)}>
          <Pin size={15} />
          <Ellipsis size={15} />

          <div className={`flex flex-col items-center gap-y-4 gap-2 z-10 absolute top-4 shadow-md bg-white p-4 rounded-lg right-1 ${show ? 'block' : 'hidden'}`}>
            <p className='text-xs flex items-center justify-between w-16 hover:border-b-2 hover:border-black p-1' onClick={() => onEdit(data)}>
              Edit
              <Pencil className='text-orange-500 font-bold' size={15} />
            </p>
            <p className='text-xs flex items-center justify-between w-16 hover:border-b-2 hover-border-black p-1' onClick={() => cardDelete(data._id)}>
              Delete
              <Trash className='text-red-500 font-bold' size={15} />
            </p>
          </div>
        </div>
      </section>
      <h1 className='text-2xl'>{data.title}</h1>
      <p className='text-gray-500 text-sm'>{data.note}</p>
      <div className='flex items-center gap-2 justify-between'>
        <section className='flex gap-2 items-center'>
          <User size={15} className='text-gray-700' />
          <span className=''>only you</span>
        </section>
        <section className='flex gap-2 items-center'>
          <CalendarDays size={15} className='text-gray-700' />
          <span className=''></span>
        </section>
      </div>
    </motion.div>
  )
}
