
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useTaskContext } from '../context/TaskContext.jsx';

export default function Tasks() {
    const { user, logout } = useAuthContext();

    const {
        tasks,
        loading,
        getTasks,
        addTask,
        updateTask,
        deleteTask
    } = useTaskContext();

    const [title, setTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getTasks().catch(() => {
            setError('No se pudieron cargar las tareas.');
        });
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            await addTask(title.trim());
            setTitle('');
            setError('');
        } catch {
            setError('No se pudo crear la tarea.');
        }
    };

    const handleToggle = async (task) => {
        try {
            await updateTask(task.id, {
                completed: !task.completed
            });
        } catch {
            setError('No se pudo actualizar la tarea.');
        }
    };

    const handleEdit = async (id) => {
        if (!editingTitle.trim()) return;

        try {
            await updateTask(id, {
                title: editingTitle.trim()
            });

            setEditingId(null);
            setEditingTitle('');
            setError('');
        } catch {
            setError('No se pudo editar la tarea.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setError('');
        } catch {
            setError('No se pudo eliminar la tarea.');
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Mis tareas</h1>
                    <p className="text-muted mb-0">
                        Bienvenido: {user?.email}
                    </p>
                </div>

                <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            </div>

            <div className="card shadow-sm p-4 mb-4">
                <h2 className="h4 mb-3">Nueva tarea</h2>

                <form onSubmit={handleAdd} className="d-flex gap-2">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="¿Qué necesitas hacer?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary" type="submit">
                        Agregar
                    </button>
                </form>
            </div>

            {error && (
                <div className="alert alert-danger">{error}</div>
            )}

            <div className="card shadow-sm p-4">
                <h2 className="h4 mb-3">Lista de tareas</h2>

                {loading && <p>Cargando tareas...</p>}

                {!loading && tasks.length === 0 && (
                    <p className="text-muted">
                        Todavía no tienes tareas. ¡Agrega la primera!
                    </p>
                )}

                <div className="list-group">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="list-group-item d-flex flex-wrap gap-3 justify-content-between align-items-center"
                        >
                            <div className="d-flex align-items-center gap-2 flex-grow-1">
                                <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggle(task)}
                                />

                                {editingId === task.id ? (
                                    <input
                                        className="form-control"
                                        value={editingTitle}
                                        onChange={(e) =>
                                            setEditingTitle(e.target.value)
                                        }
                                    />
                                ) : (
                                    <span
                                        className={
                                            task.completed
                                                ? 'text-decoration-line-through text-muted'
                                                : ''
                                        }
                                    >
                                        {task.title}
                                    </span>
                                )}
                            </div>

                            <div className="d-flex gap-2">
                                {editingId === task.id ? (
                                    <>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleEdit(task.id)}
                                        >
                                            Guardar
                                        </button>

                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setEditingId(null)}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => {
                                            setEditingId(task.id);
                                            setEditingTitle(task.title);
                                        }}
                                    >
                                        Editar
                                    </button>
                                )}

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
