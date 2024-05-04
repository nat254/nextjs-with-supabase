"use client";
import { Button } from "@/components/ui/button";

type DeleteFuncProps = {
    handleDelete: any;
    id: number;
}

export default function DeleteFunc({handleDelete, id}: DeleteFuncProps) {
    return (
        <Button onClick={() => handleDelete(id)} style={{ backgroundColor: "#800020", marginTop: "10px", marginBottom: "10px", color: "#FAF9F6" }}>Delete</Button>
    )
}