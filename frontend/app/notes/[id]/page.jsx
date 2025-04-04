"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NoteDetails() {
  const params = useParams()
  const { id } = params
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchNote() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://note-app-backend-7628.onrender.com/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNote(response.data.data)
      } catch (error) {
        console.error('Failed to fetch note:', error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size={80} className="animate-spin w-32 text-blue-500" />
      </div>
    )
  }

  if (!note) {
    return <div>Note not found</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='max-w-2xl mx-auto p-4'
    >
      <Button onClick={() => router.push('/dashboard')} className='mb-4'>
        Back to Dashboard
      </Button>
      <h1 className='text-3xl font-bold mb-4'>{note.title}</h1>
      <p className='text-gray-700'>{note.note}</p>
    </motion.div>
  )
}
