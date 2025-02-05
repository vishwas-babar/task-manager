'use client'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FieldValues, useForm } from 'react-hook-form'
import { createTask } from '@/actions/task.action'
import toast from 'react-hot-toast'
import { useRecoilRefresher_UNSTABLE } from 'recoil'
import { tasksState } from '@/state/state'


const AddTodo = () => {
    const { register, handleSubmit, reset } = useForm()

    // for updating the current state after adding a new task
    const triggerRecoilRefresh = useRecoilRefresher_UNSTABLE(tasksState);

   

    const submitForm = async (data: FieldValues) => {
        console.log(data)

        try {
            const res = await createTask({ title: data.task, dueDate: new Date(data.dueDate) });
            
            if (!res.success) {
                console.log(res.message);
                toast.error(res.message);
                return;
            }
            
            toast.success(res.message);
            triggerRecoilRefresh();
            reset();
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className='fixed bottom-10 left-1/2 -translate-x-1/2 p-6 rounded-lg shadow-lg border bg-white w-[60rem] flex flex-col items-center'>
            <h2 className='text-lg font-semibold mb-4 text-gray-700'>Add New Task</h2>
            <form className='flex gap-4 w-full' onSubmit={handleSubmit(submitForm)}>
                <Input
                    placeholder='Enter task title...'
                    type='text'
                    {...register('task', { required: true })}
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
                <Input
                    defaultValue={new Date().toISOString().split('T')[0]}
                    type='date'
                    min={new Date().toISOString().split('T')[0]}
                    {...register('dueDate', { required: true })}
                    className='w-40 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
                <Button
                    className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all'
                    type='submit'
                >
                    Add Task
                </Button>
            </form>
        </div>
    )
}
export default AddTodo