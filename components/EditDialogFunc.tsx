"use client";

import { Button } from "@/components/ui/button"
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
import { useState } from "react";
// import { createClient } from "@/utils/supabase/server";

type DialogFuncProps = {
    handleEdit: any;
    id: number;
    name: string;
    description: string;
    priority: number;
    done: boolean;
}

function EditDialogFunc({handleEdit, id, name, description, priority, done}: DialogFuncProps) {
 
  const [nameTodo, setName] = useState<string>("");
  const [descriptionTodo, setDescription] = useState<string>("");
  const [priorityTodo, setPriority] = useState<number>(0);
  const [doneTodo, setDone] = useState<boolean>(false);

  console.log(id, nameTodo, descriptionTodo, priorityTodo, done);

   
  return (
    
    <Dialog>
        <DialogTrigger asChild>
        <Button style={{ marginRight: "15px", backgroundColor: "#E97451" }} onClick={() => {setName(name), setDescription(description), setPriority(priority), setDone(done)}}>Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit ToDo</DialogTitle>
                <DialogDescription>
                    Edit a task by filling in the details.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit = { () => handleEdit(id, nameTodo, descriptionTodo, priorityTodo, done)}>
                <div className="grid gap-4 py-4">
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name:</Label>
                        <Input id="name" name="name" placeholder="e.g cooking" value={nameTodo} onChange={(e) => setName(e.target.value)} className="col-span-3 p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description:</Label>
                        <Input id="description" name="description" value={descriptionTodo} onChange={(e) => setDescription(e.target.value)} placeholder="e.g use 5L oil" className="col-span-3 p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">Priority:</Label>
                        <Input type="number" id="priority" name="priority" value={priorityTodo} onChange={(e) => setPriority(parseInt(e.target.value))}placeholder="e.g use 5L oil" className="col-span-3 p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="done" className="text-right">Done:</Label>

                        <Input type = "checkbox" id="done" name="done" onChange={(e) => setDone(e.target.checked)}  checked={done} />
                    </div>
                </div>
                <DialogFooter>
                    
                    <Button type="submit"  style={{ backgroundColor: "#800020", marginTop: "10px", marginBottom: "10px", color: "#FAF9F6" }}>Save changes</Button>
                </DialogFooter>
            </form>
            
        </DialogContent>
    </Dialog>
    
  )
}

export default EditDialogFunc;
