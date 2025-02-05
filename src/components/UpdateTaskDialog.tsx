'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSingleTask, updateTask } from '@/actions/task.action';
import toast from 'react-hot-toast';
import { Task } from '@prisma/client';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { tasksState } from '@/state/state';

const UpdateTaskDialog = ({ modalTriggerRef, updateTaskId }: {
  modalTriggerRef: React.MutableRefObject<HTMLButtonElement | null>,
  updateTaskId: string,
}) => {

  const [currentTask, setCurrentTask] = useState<Task | null>();
  const [isTaskLoading, setIsTaskLoading] = useState(true); 
  const triggerRecoilSelectorUpdate =  useRecoilRefresher_UNSTABLE(tasksState)

  const { handleSubmit, register } = useForm({
    values: {
      title: currentTask?.title || "",
      dueDate: currentTask?.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : ""
    }
  });

  useEffect(() => {
    getSingleTask(updateTaskId)
      .then(res => {
        if (!res.success) {
          setIsTaskLoading(false)
         
        } else {
          setCurrentTask(res.data)
          setIsTaskLoading(false)
        }
      })
      .catch(err => console.log(err))

    return () => {
      setIsTaskLoading(true)
    }
  }, [updateTaskId])



   async function submitForm(data: any) {
    console.log(data)
     try {
       toast.promise(updateTask({ taskId: updateTaskId, title: data.title, dueDate: data.dueDate }), {
         loading: "updating a task",
         success: (res: any) => {
           if (res.success) {
              triggerRecoilSelectorUpdate()
             return res.message
           } else {
             throw new Error(res.message)
           }
         },
         error: (error: any) => {
           return error.message
         }
       })
     } catch (error: any) {
       toast.error(error.message)
     }
  }

  return (
    <Dialog>
      <DialogTrigger
        className='hidden '
        ref={modalTriggerRef}
      >
        <button className="btn">Update Task</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Update your task here
          </DialogDescription>
        </DialogHeader>
        {isTaskLoading ? (
          <>
            loading...
          </>
        ) : currentTask ? (
          <div className="flex flex-col space-y-4">
              <form
                className='flex flex-col gap-5'
                onSubmit={handleSubmit(submitForm)} >

                <Input
                  {...register('title')} type='text' />

                <Input
                  className='w-36'
                  {...register('dueDate')} type='date' />

              <Button type='submit'>
                Update
              </Button>
            </form>
          </div>
        ) : (
          <>
            something is wrong
          </>
        )}
      </DialogContent>

    </Dialog>
  )
}

export default UpdateTaskDialog