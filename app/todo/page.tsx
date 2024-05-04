
// "use server";
"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import { Button } from "@/components/ui/button"

import { getAllTodos, createTodo, deleteTodo, updateTodo } from "./actions";

import DeleteFunc from "@/components/DeleteFunc";
import { useEffect, useState } from "react";
import { TodoProps } from "@/types";
import { DialogFuncTypes } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { todo } from "node:test";



export default function TodoPage() {

    const [todos, setTodos] = useState<TodoProps[]>([]);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<number>(0);
    const [done, setDone] = useState<boolean>(false);

    useEffect(() => {
        const handleRead = async () => {
            try {
                const todoItems = await getAllTodos();
                setTodos(todoItems);
            } catch (error) {
                console.error('Error fetching todos: ', error);
            }
        }
        handleRead();
    }, []);



    const handleSubmit = async ({ name, description, priority, done }: DialogFuncTypes) => {
        try {
            await createTodo({ name, description, priority, done });
        } catch (error) {
            console.error('Error creating todo: ', error);
        }
    }

    const handleEdit = async (id: number, name: string, description: string, priority: number, done: boolean) => {

        try {
            await updateTodo({ id, name, description, priority, done });
        } catch (error) {
            console.error('Error creating todo: ', error);
        }
    }

    const handleDelete = async (id:number) => {
        

        try{
            await deleteTodo(id);
            todos?.filter((todo) => todo.id !== id);
        }catch(error){
            console.error('Error creating todo: ', error);
        }
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '200px' }}>

            <div style={{ width: '97%', display: 'flex', justifyContent: 'flex-end' }}>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button style={{ backgroundColor: "#800020", marginTop: "10px", marginBottom: "10px", color: "#FAF9F6" }}>Add</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add ToDo</DialogTitle>
                            <DialogDescription>
                                Add a task by filling in the details.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={() => handleSubmit({ name, description, priority, done })}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Name:</Label>
                                    <Input id="name" name="name" placeholder="e.g cooking" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">Description:</Label>
                                    <Input id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g use 5L oil" className="col-span-3 p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="priority" className="text-right">Priority:</Label>
                                    <Input type="number" id="priority" name="priority" value={priority} onChange={(e) => setPriority(parseInt(e.target.value))} placeholder="e.g use 5L oil" className="col-span-3 p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="done" className="text-right">Done:</Label>

                                    <Input type="checkbox" id="done" name="done" onChange={(e) => setDone(e.target.checked)} checked={done} />
                                </div>
                            </div>
                            <DialogFooter>

                                <Button type="submit" style={{ backgroundColor: "#800020", marginTop: "10px", marginBottom: "10px", color: "#FAF9F6" }}>Save changes</Button>
                            </DialogFooter>
                        </form>

                    </DialogContent>
                </Dialog>
            </div>

            <Table>


                <TableCaption>TODO List.</TableCaption>

                <TableHeader>

                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Done</TableHead>
                        <TableHead className="text-right">Modify</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todos?.map((todo) => (
                        <TableRow key={todo.id}>

                            <TableCell className="font-medium">{todo.id}</TableCell>
                            <TableCell>{todo.name}</TableCell>
                            <TableCell>{todo.description}</TableCell>
                            <TableCell>{todo.created_at}</TableCell>
                            <TableCell>{todo.priority}</TableCell>
                            <TableCell>{todo.done ? 'Yes' : 'No'}</TableCell>
                            <TableCell className="text-right">

                                {/* <Button style={{ marginRight: "15px", backgroundColor: "#E97451" }}>Edit</Button> */}
                                {/* <EditDialogFunc handleEdit={handleEdit} id={todo.id}></EditDialogFunc> */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button onClick={()=>{setName(todo.name), setDescription(todo.description), setPriority(todo.priority), setDone(todo.done)}} style={{ marginRight: "15px", backgroundColor: "#E97451" }} >Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit ToDo</DialogTitle>
                                            <DialogDescription>
                                                Edit a task by filling in the details.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={() => handleEdit(todo.id, name, description, priority, done)}>
                                            <div className="grid gap-4 py-4">

                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">Name:</Label>
                                                    <Input id="name" name="name" placeholder="e.g cooking" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 p-2 border border-gray-300 rounded" />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="description" className="text-right">Description:</Label>
                                                    <Input id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g use 5L oil" className="col-span-3 p-2 border border-gray-300 rounded" />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="priority" className="text-right">Priority:</Label>
                                                    <Input type="number" id="priority" name="priority" value={priority} onChange={(e) => setPriority(parseInt(e.target.value))} placeholder="e.g use 5L oil" className="col-span-3 p-2 border border-gray-300 rounded" />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="done" className="text-right">Done:</Label>

                                                    <Input type="checkbox" id="done" name="done" onChange={(e) => setDone(e.target.checked)} checked={done} />
                                                </div>
                                            </div>
                                            <DialogFooter>

                                                <Button type="submit" style={{ backgroundColor: "#800020", marginTop: "10px", marginBottom: "10px", color: "#FAF9F6" }}>Save changes</Button>
                                            </DialogFooter>
                                        </form>

                                    </DialogContent>
                                </Dialog>
                                {/* <Button onClick={() => {handleDelete(todo.id)}} style={{ backgroundColor: "#5DADE2" }}>Delete</Button> */}
                                <DeleteFunc handleDelete={handleDelete} id={todo.id}></DeleteFunc>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>

    );
};

