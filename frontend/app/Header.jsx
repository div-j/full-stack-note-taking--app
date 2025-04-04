"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Header() {
   const {router} =  useRouter()
  return (
    <div>
        <nav>
            <div className="flex items-center justify-between p-5 bg-white shadow-md">
                <div>
                <h1 className="text-2xl font-bold">NoteTaking</h1>
                </div>
                <div>
                <Link href="/dashboard" className="px-3 py-2 text-white bg-blue-500 rounded-md" 
                >Dashboard</Link>

                </div>
            </div>

        </nav>
      
    </div>
  )
}
