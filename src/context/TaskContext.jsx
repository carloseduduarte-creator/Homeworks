
import { createContext, useContext, useState } from 'react';
import { useCollection } from '../hooks/useCollection.js';
import { useAuthContext } from './AuthContext.jsx';

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const { user } = useAuthContext();
    const { documents, getAll, add, update, remove } = useCollection('tasks');
    const [loading, setLoading] = useState(false);

    const getTasks = async () => {
        if (!user) return;

        setLoading(true);

        try {
            await getAll(user.uid);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (title) => {
        if (!user) return;

        await add({
            title,
            completed: false,
            userId: user.uid,
            createdAt: new Date().toISOString()
        });

        await getTasks();
    };

    const updateTask = async (id, data) => {
        await update(id, data);
        await getTasks();
    };

    const deleteTask = async (id) => {
        await remove(id);
        await getTasks();
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: documents,
                loading,
                getTasks,
                addTask,
                updateTask,
                deleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    return useContext(TaskContext);
}
