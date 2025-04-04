"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/app/_context/authContext'
import { Loader } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
const {LoginUser, loading} = useAuth()

async function handleSubmmit(e) {
    e.preventDefault()
    LoginUser(email,password)
}


  return (
    <div className='flex justify-center items-center h-screen flex-col '>
        <section className='p-4 shadow-md rounded-xl bg-white   w-96'>
            <h1 className='text-2xl font-bold text-center '>Login</h1>
            <form action="" className='space-y-4 mt-4 w-80' onSubmit={handleSubmmit} >
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    type='email' id='email' placeholder='Enter your email' />
                </div>
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      value={password}
                      onChange = {(e) => setPassword(e.target.value)}
                    type='password' id='password' placeholder='********' />
                </div>
                <Button type='submit' className='w-full mt-4'>{loading===false?"Submit":<Loader className='animate-spin' />}</Button>
            </form>
            <div className='text-center mt-4'>
                  Don't have an account? <Link href='/signup' className='text-blue-500'>Signup</Link> here
                </div>
        </section>
    </div>
  )
}
