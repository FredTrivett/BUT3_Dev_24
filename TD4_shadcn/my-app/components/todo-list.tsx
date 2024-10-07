"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DragDropContext as DragDropContextComponent, Droppable as DroppableComponent, Draggable as DraggableComponent } from "@hello-pangea/dnd";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inProgress, setInProgress] = useState<Todo[]>([]);
    const [done, setDone] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const addTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo("");
        }
    };

    const toggleTodo = (id: number, list: "todos" | "inProgress" | "done") => {
        if (list === "todos") {
            setTodos((prevTodos) => {
                const todoToMove = prevTodos.find((todo) => todo.id === id);
                if (todoToMove) {
                    setDone((prevDone) => [
                        ...prevDone,
                        { ...todoToMove, completed: true },
                    ]);
                    return prevTodos.filter((todo) => todo.id !== id);
                }
                return prevTodos;
            });
        } else if (list === "inProgress") {
            setInProgress((prevInProgress) => {
                const todoToMove = prevInProgress.find((todo) => todo.id === id);
                if (todoToMove) {
                    setDone((prevDone) => [
                        ...prevDone,
                        { ...todoToMove, completed: true },
                    ]);
                    return prevInProgress.filter((todo) => todo.id !== id);
                }
                return prevInProgress;
            });
        } else {
            setDone((prevDone) =>
                prevDone.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            );
        }
    };

    const removeTodo = (id: number, list: "todos" | "inProgress" | "done") => {
        const updateList =
            list === "todos"
                ? setTodos
                : list === "inProgress"
                    ? setInProgress
                    : setDone;
        updateList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceList =
            source.droppableId === "todoList"
                ? todos
                : source.droppableId === "inProgressList"
                    ? inProgress
                    : done;
        const destList =
            destination.droppableId === "todoList"
                ? todos
                : destination.droppableId === "inProgressList"
                    ? inProgress
                    : done;

        const [reorderedItem] = sourceList.splice(source.index, 1);

        // Remove the completed status when moving from 'done' to other lists
        if (
            source.droppableId === "doneList" &&
            destination.droppableId !== "doneList"
        ) {
            reorderedItem.completed = false;
        }

        // Add completed status when moving to 'done' list
        if (destination.droppableId === "doneList") {
            reorderedItem.completed = true;
        }

        destList.splice(destination.index, 0, reorderedItem);

        // Update state for source and destination lists
        if (source.droppableId !== destination.droppableId) {
            if (source.droppableId === "todoList") setTodos([...sourceList]);
            else if (source.droppableId === "inProgressList")
                setInProgress([...sourceList]);
            else setDone([...sourceList]);

            if (destination.droppableId === "todoList") setTodos([...destList]);
            else if (destination.droppableId === "inProgressList")
                setInProgress([...destList]);
            else setDone([...destList]);
        }
    };

    const startEditing = (id: number, text: string) => {
        setEditingTodo(id);
        setEditText(text);
    };

    const saveEdit = (id: number, list: "todos" | "inProgress" | "done") => {
        const updateList =
            list === "todos"
                ? setTodos
                : list === "inProgress"
                ? setInProgress
                : setDone;

        updateList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: editText } : todo
            )
        );
        setEditingTodo(null);
    };

    interface TodoListProps {
        todos: Todo[];
        listId: string;
        listName: string;
    }

    const TodoList: React.FC<TodoListProps> = ({ todos, listId, listName }) => (
        <DroppableComponent droppableId={listId}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-2 h-full p-4 rounded-md transition-colors duration-200 ${
                        snapshot.isDraggingOver
                            ? "bg-atlassian-blue-light/10"
                            : "bg-atlassian-gray-lighter"
                    }`}
                >
                    {todos.map((todo, index) => (
                        <DraggableComponent
                            key={todo.id}
                            draggableId={todo.id.toString()}
                            index={index}
                        >
                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex items-center justify-between bg-white p-3 rounded-md border border-atlassian-gray-lighter ${
                                        snapshot.isDragging ? "opacity-50" : ""
                                    }`}
                                >
                                    {editingTodo === todo.id ? (
                                        <div className="flex items-center flex-grow mr-2">
                                            <Input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                onBlur={() =>
                                                    saveEdit(
                                                        todo.id,
                                                        listId === "todoList"
                                                            ? "todos"
                                                            : listId === "inProgressList"
                                                            ? "inProgress"
                                                            : "done"
                                                    )
                                                }
                                                className="flex-grow mr-2"
                                                autoFocus
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    saveEdit(
                                                        todo.id,
                                                        listId === "todoList"
                                                            ? "todos"
                                                            : listId === "inProgressList"
                                                            ? "inProgress"
                                                            : "done"
                                                    )
                                                }
                                                className="text-atlassian-green"
                                            >
                                                <Check className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <span
                                            className={
                                                listId === "doneList"
                                                    ? "line-through text-atlassian-gray-light"
                                                    : "text-atlassian-gray"
                                            }
                                        >
                                            {todo.text}
                                        </span>
                                    )}
                                    <div className="flex">
                                        {editingTodo !== todo.id && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => startEditing(todo.id, todo.text)}
                                                className="text-atlassian-gray-light hover:text-atlassian-blue mr-2"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                removeTodo(
                                                    todo.id,
                                                    listId === "todoList"
                                                        ? "todos"
                                                        : listId === "inProgressList"
                                                        ? "inProgress"
                                                        : "done"
                                                )
                                            }
                                            className="text-atlassian-gray-light hover:text-atlassian-red"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </li>
                            )}
                        </DraggableComponent>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </DroppableComponent>
    );

    return (
        <DragDropContextComponent onDragEnd={onDragEnd}>
            <div className="min-h-screen bg-white flex flex-col">
                <main className="p-8 flex-grow flex flex-col">
                    <h2 className="text-3xl font-bold mb-6 text-atlassian-gray">
                        Welcome back to Atlassian!
                    </h2>

                    <div className="flex gap-8 mb-8 flex-grow">
                        {/* Todo List */}
                        <div className="bg-white rounded-lg p-6 flex-1 border border-atlassian-gray-lighter flex flex-col">
                            <h3 className="text-xl font-semibold mb-4 text-atlassian-gray">
                                Backlog
                            </h3>
                            <div className="flex mb-4">
                                <Input
                                    type="text"
                                    placeholder="Add a new To Do"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    className="flex-grow mr-2 border-atlassian-gray-lighter focus:border-atlassian-blue focus:ring-atlassian-blue"
                                />
                                <Button
                                    onClick={addTodo}
                                    className="bg-atlassian-blue hover:bg-atlassian-blue-dark text-white"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add
                                </Button>
                            </div>
                            <div className="flex-grow overflow-y-auto">
                                <TodoList todos={todos} listId="todoList" listName="Todo" />
                            </div>
                        </div>

                        {/* In Progress List */}
                        <div className="bg-white rounded-lg p-6 flex-1 border border-atlassian-gray-lighter flex flex-col">
                            <h3 className="text-xl font-semibold mb-4 text-atlassian-gray">
                                In Progress
                            </h3>
                            <div className="flex-grow overflow-y-auto">
                                <TodoList
                                    todos={inProgress}
                                    listId="inProgressList"
                                    listName="In Progress"
                                />
                            </div>
                        </div>

                        {/* Done List */}
                        <div className="bg-white rounded-lg p-6 flex-1 border border-atlassian-gray-lighter flex flex-col">
                            <h3 className="text-xl font-semibold mb-4 text-atlassian-gray">
                                Done
                            </h3>
                            <div className="flex-grow overflow-y-auto">
                                <TodoList todos={done} listId="doneList" listName="Done" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-lg p-6 border border-atlassian-gray-lighter">
                        <h3 className="text-xl font-semibold mb-4 text-atlassian-gray">
                            Quick Stats
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-atlassian-gray-light">Total Tasks</p>
                                <p className="text-2xl font-bold text-atlassian-gray">
                                    {todos.length + inProgress.length + done.length}
                                </p>
                            </div>
                            <div>
                                <p className="text-atlassian-gray-light">To Do</p>
                                <p className="text-2xl font-bold text-atlassian-blue">
                                    {todos.length}
                                </p>
                            </div>
                            <div>
                                <p className="text-atlassian-gray-light">In Progress</p>
                                <p className="text-2xl font-bold text-atlassian-yellow">
                                    {inProgress.length}
                                </p>
                            </div>
                            <div>
                                <p className="text-atlassian-gray-light">Done</p>
                                <p className="text-2xl font-bold text-atlassian-green">
                                    {done.length}
                                </p>
                            </div>
                            <div>
                                <p className="text-atlassian-gray-light">Pending Tasks</p>
                                <p className="text-2xl font-bold text-atlassian-red">
                                    {todos.filter((todo) => !todo.completed).length +
                                        inProgress.filter((todo) => !todo.completed).length}
                                </p>
                            </div>
                            <div>
                                <p className="text-atlassian-gray-light">Completion Rate</p>
                                <p className="text-2xl font-bold text-atlassian-green">
                                    {todos.length + inProgress.length + done.length > 0
                                        ? Math.round(
                                            (done.length /
                                                (todos.length + inProgress.length + done.length)) *
                                            100
                                        )
                                        : 0}
                                    %
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </DragDropContextComponent>
    );
}