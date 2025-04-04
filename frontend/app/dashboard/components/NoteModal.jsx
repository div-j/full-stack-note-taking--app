"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function NoteModal({ isOpen, onClose, onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/notes/create', { title, note }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        toast.success('Note added successfully');
        onNoteAdded(response.data);
        setTitle('');
        setNote('');
        onClose();
      }
    } catch (error) {
      toast.error('Failed to add note');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    >
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-semibold mb-4'>Add Note</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='title'>Title</Label>
            <Input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter note title'
            />
          </div>
          <div>
            <Label htmlFor='note'>Note</Label>
            <Input
              type='text'
              id='note'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Enter note content'
            />
          </div>
          <Button type='submit' className='w-full mt-4'>
            {loading ? 'Adding...' : 'Add Note'}
          </Button>
        </form>
        <Button onClick={onClose} className='w-full mt-4 bg-red-500'>
          Cancel
        </Button>
      </div>
    </motion.div>
  );
}
