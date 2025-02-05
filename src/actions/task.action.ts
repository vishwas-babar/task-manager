'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import taskSchema from "@/schema/taskschema"


export const createTask = async (data: { title: string, dueDate: Date }) => {

    const validate = taskSchema.safeParse(data);
    
    if (!validate.success) {
        return {
            success: false,
            message: validate.error.format().title?._errors[0] || validate.error.format().dueDate?._errors[0] || "invalid task details"
        }
    }
    
    try {
        const currentUser = await auth();

        if (!currentUser?.user) {
            return {
                message: "you need to login first!",
                success: false
            }
        }

        const createdTask = await prisma.task.create({
            data: {
                title: data.title,
                dueDate: data.dueDate,
                userId: currentUser.user.id || ""
            }
        })

        if (!createTask) {
            return {
                message: "not able to create a task",
                success: false
            }
        }

        return {
            message: "taskCreated",
            success: true,
            data: createdTask
        }
        
    } catch (error: any) {
        console.log(error)
        return {
            message: error.message || "something went wrong",
            success: false
        }
    }

}



export const updateTask = async (data: { title: string, dueDate: Date | string, taskId: string }) => {

    // if dueDate is string the convert it to date
    let dueDate = data.dueDate;
    if (typeof data.dueDate === "string") {
        dueDate = new Date(data.dueDate)
    }

    const validate = taskSchema.safeParse({
        title: data.title,
        dueDate: dueDate
    });

    if (!validate.success) {
        console.log(validate.error)
        return {
            success: false,
            message: validate.error.format().title?._errors[0] || validate.error.format().dueDate?._errors[0] || "invalid task details"
        }
    }

    try {
        const currentUser = await auth();

        if (!currentUser?.user) {
            return {
                message: "you need to login first!",
                success: false
            }
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: data.taskId
            },
            data: {
                title: data.title,
                dueDate: dueDate,
                
            }
        })

        if (!updateTask) {
            return {
                message: "not able to update a task",
                success: false
            }
        }

        return {
            message: "task updated",
            success: true,
            data: updatedTask
        }

    } catch (error: any) {
        console.log(error)
        return {
            message: error.message || "something went wrong",
            success: false
        }
    }
}


export const deleteTask = async (data: { taskId: string }) => {

    try {
        const currentUser = await auth();

        if (!currentUser?.user) {
            return {
                message: "you need to login first!",
                success: false
            }
        }

        const deltedTask = await prisma.task.delete({
            where: {
               id: data.taskId
           }
        })

        if (!deltedTask) {
            return {
                message: "not able to delete a task",
                success: false
            }
        }

        return {
            message: "task deleted",
            success: true
        }

    } catch (error: any) {
        return {
            message: error.message || "something went wrong",
            success: false
        }
    }

}


export const getAllUsersTasks = async () => {
    
    try {
        
        const currentUser = await auth();

        if (!currentUser?.user) {
            return {
                message: "you need to login first!",
                success: false
            }
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId: currentUser.user.id
            }
        })

        return {
            message: "tasks fetched",
            success: true,
            data: tasks
        }
    } catch (error: any) {
        return {
            message: error.message || "something went wrong",
            success: false
        }
    }
}


export const markTaskAsDone = async (data: { taskId: string }) => {
    try {
        const currentUser = await auth();

        if (!currentUser?.user) {
            return {
                message: "you need to login first!",
                success: false
            }
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: data.taskId
            },
            data: {
                status: "completed"
            }
        })

        if (!updatedTask) {
            return {
                message: "not able to update a task",
                success: false
            }
        }

        return {
            message: "task updated",
            success: true,
            updateTask: updatedTask
        }

    } catch (error: any) {
        return {
            message: error.message || "something went wrong",
            success: false
        }
    }
}


export const getSingleTask = async (taskId: string) => {
    try {

        const currentUser = await auth();

        if (!currentUser?.user) {
            return {
                success: false,
                message: "you need to login first!"
           } 
        }

        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId: currentUser.user.id
            }   
        })

        if (!task) {
            return {
                success: false,
                message: "task not found"
            } 
        }

        return {
            success: true,
            message: "fot the task",
            data: task
        } 

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "something went wrong!"
        } 
    }
}