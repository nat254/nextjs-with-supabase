import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export async function getAllTodos() {
    const { data, error } = await supabase.from('todo').select('*');
    if (error) {
        throw new Error('Error fetching todos: ' + error.message);
    }
    return data || [];
}

export async function createTodo({ name, description, priority, done }: any) {

    const { data, error } = await supabase
        .from('todo')
        .insert([
            { name: name, description: description, priority: priority, done: done },
        ])
        .select()

    if (error) {
        throw new Error(error.message);
    }

    // return data;
}

export async function updateTodo({ id, name, description, priority, done }: any) {
    console.log(id, name, description, priority, done);

    const { data, error } = await supabase
        .from('todo')
        .update({ name: name, description: description, priority: priority, done })
        .eq('id', id)
        .single()

    if (error) {
        throw new Error(error.message);
    }

    // return data;
}

export async function deleteTodo(id: number) {
    const { data, error } = await supabase
        .from('todo')
        .delete()
        .eq('id', id)
        .single()

    if (error) {
        throw new Error(error.message);
    }

    return data;
}