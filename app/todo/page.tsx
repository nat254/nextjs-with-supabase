
// "use server";

import { createClient } from "@/utils/supabase/server";
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
import DialogFunc from "@/components/DialogFunc";
import {createTodo, deleteTodo, updateTodo} from "./actions";
import DialogFuncTypes from "@/types";
import EditDialogFunc from "@/components/EditDialogFunc";
import DeleteFunc from "@/components/DeleteFunc";



export default async function TodoPage() {

    const supabase = createClient();

    let { data: todos } = await supabase.from('todo').select('*').order('id', { ascending: true });

    const handleSubmit = async ({name, description,priority,done}:DialogFuncTypes) => {
        "use server";
        
        try{
            await createTodo({name, description, priority, done});
        }catch(error){
            console.error('Error creating todo: ', error);
        }
    }

    const handleEdit = async (id:number, name:string, description:string,priority:number,done:boolean) => {
        "use server";
        
        try{
            await updateTodo({id, name, description, priority, done});
        }catch(error){
            console.error('Error creating todo: ', error);
        }
    }

    const handleDelete = async (id:number) => {
        "use server";
        
        try{
            await deleteTodo(id);
            
        }catch(error){
            console.error('Error creating todo: ', error);
        }
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '200px' }}>

            <div style={{ width: '97%', display: 'flex', justifyContent: 'flex-end' }}>
                <DialogFunc handleSubmit={handleSubmit}></DialogFunc>
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
                                <EditDialogFunc handleEdit={handleEdit} id={todo.id}></EditDialogFunc>
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

