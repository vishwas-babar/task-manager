'use client'
import React, { useEffect, useRef, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteTask, getAllUsersTasks, markTaskAsDone } from "@/actions/task.action";
import toast from "react-hot-toast";
import UpdateTaskDialog from "./UpdateTaskDialog";


interface Task {
    id: string;
    createdAt: Date;
    title: string;
    status: string;
    dueDate: Date | null;
    userId: string;
}

const TodoList = () => {

    const [tasks, setTasks] = useState<Task[]>([]);


    // for updating a task
    const modalTriggerRef = useRef<HTMLButtonElement | null>(null)
    const [updateTaskId, setUpdateTaskId] = useState("");

    useEffect(() => {
      
        getAllUsersTasks()
            .then(res => {
                if (res.success) {
                    setTasks(res.data || [])
                }

                if (!res.success) {
                    console.log(res.message)  
                }
        })
    
      return () => {
        
      }
    }, [])
    

    function getDate(date: Date | null) {
        if (!date) {
            return "N/A"
        }

        return new Date(date).toDateString() 
    }

    async function doneTask(id: string) { 
        
        try {
            
            toast.promise(markTaskAsDone({ taskId: id }), {
                loading: "Marking task as done",
                success: (res: any) => {
                    if (res.success) {
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
    
    async function deleteTheTask(id: string) {
        try {

            toast.promise(deleteTask({ taskId: id }), {
                loading: "deleting a task",
                success: (res: any) => {
                    if (res.success) {
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
        <div className="p-6 max-w-4xl mx-auto">
            <Table className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <TableCaption>Manage your tasks effectively</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="text-left">Title</TableHead>
                        <TableHead className="text-left">Due Date</TableHead>
                        <TableHead className="text-left">Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((todo) => (
                        <TableRow
                            key={todo.id}
                            className="hover:bg-gray-100 transition duration-200"
                        >
                            <TableCell>{todo.title}</TableCell>
                            <TableCell>{getDate(todo.dueDate)}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${todo.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : todo.status === "In Progress"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {todo.status}
                                </span>
                            </TableCell>
                            <TableCell className="flex items-center justify-center gap-3">
                                <Button variant="ghost"
                                    onClick={() => {
                                        setUpdateTaskId(todo.id)
                                        modalTriggerRef.current?.click()
                                    }}
                                    size="icon">
                                    <Pencil className="w-4 h-4 text-blue-500" />
                                </Button>
                                <Button variant="ghost" onClick={() => doneTask(todo.id)} size="icon">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                </Button>
                                <Button variant="ghost" onClick={() => deleteTheTask(todo.id)} size="icon">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
           
        <UpdateTaskDialog modalTriggerRef={modalTriggerRef} updateTaskId={updateTaskId} />
        </div>
    );
};

export default TodoList;