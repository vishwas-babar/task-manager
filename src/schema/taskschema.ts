import { z } from 'zod'

const taskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).trim(),
    dueDate: z.date().optional(),
});

export default taskSchema