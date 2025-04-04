"use client"
import { Button } from '@/components/ui/button'
import { FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSummit(e) {
    e.preventDefault()
    // using axios
    try {
      setLoading(true)

      let resp = await axios.post('https://note-app-backend-7628.onrender.com/user/create', { email, password, name })
      console.log(resp)

      if (resp.status === 200) {
        toast.success('Account created successfully')
        router.push('/login')
      }
    } catch (error) {
      console.log(error.message)
      if (error.status === 404) {
        toast.error('User already exists')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='max-w-md mx-auto h-screen flex flex-col justify-center items-center'
    >
      <section className='p-4 shadow-md rounded-xl bg-white w-96'>
        <h2 className='text-2xl font-semibold text-center'>Sign Up</h2>
        <form className='space-y-4 mt-4' onSubmit={handleSummit}>
          <div>
            <Label htmlFor='email'>Name</Label>
            <Input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
            />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
          </div>
          <div>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
            />
          </div>

          <Button type='submit' className='w-full mt-4'>
            {loading === false ? 'Submit' : <Loader className='animate-spin' />}
          </Button>
        </form>
        <div className='text-center mt-4'>
          Already have an account? <Link href='/login' className='text-blue-500'>Login</Link>
        </div>
      </section>
    </motion.div>
  )
}
