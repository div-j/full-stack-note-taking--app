"use client"
import React, { useEffect, useState } from 'react'
import NoteCard from './components/NoteCard'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { useNote } from '../_context/noteContext'
import { NoteDialog } from './components/NoteDialog'

export default function Home() {
const {searchInput,notes,} = useNote()


  const filterTexts = [
    "All",
    "Today",
    "This Week",
    "Last Week",
    "Last Month",
    "This Year",
  ]

  const filteredNotes = notes.filter((item) => {
    const searchText = searchInput.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchText) ||
      item.note.toLowerCase().includes(searchText)
    );
  });

  
  return (
    <div className='bg-white p-4 rounded-md '>
      <h1 className='text-2xl text-gray-700  '>Your Notes</h1>
   <NoteDialog/>
      <div className='flex flex-wrap items-center gap-x-4 mt-4'>
        {filterTexts.map((text, index) => (
<h2 key={index} className='hover:font-bold hover:text-black cursor-pointer'>{text}</h2>
        ))}
      </div>

    {!notes.length?  <section className='flex flex-wrap items-center justify-center gap-4 mt-5'>
  {[1,2,3,4].map((item,index) =>(
    <div key={index} className='h-80 w-64 bg-slate-300 animate-pulse rounded-lg'></div>
  ))}
  
</section>:

<section className='flex flex-wrap items-center justify-center gap-4 mt-5'>
  {filteredNotes.map((note) =>(
       <NoteCard data={note}  key={note._id} />
  ))}
  
</section>}
    </div>
  )
}
