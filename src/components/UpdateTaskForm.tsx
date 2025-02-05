'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'

const UpdateTaskForm = () => {

    const { register, handleSubmit } = useForm()


    function submitForm(data: any) {
        
    }

  return (
      <form onSubmit={handleSubmit(submitForm)} >
          
          <Input {...register('title')} type='text' />

          <Input {...register('dueDate')} type='date' />

          <Button type='submit'>
              Update
          </Button>
    </form>
  )
}

export default UpdateTaskForm