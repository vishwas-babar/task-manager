import { getAllUsersTasks } from "@/actions/task.action";
import { atom, selector } from "recoil";


export const currentUserState = atom({
    key: 'currentUser',
    default: {
        id: "",
        email: "",
    }
})

// get all tasks of current user
export const tasksState = selector({
    key: 'tasks',
    get: async ({  }) => {
        const res = await getAllUsersTasks();
        
        if (!res.success) {
            console.log(res.message);
            return [];
        }

        const data = res.data?.reverse() || [];
        return data;
    },  
})

