import { Prisma, TodoList } from "@prisma/client";

export interface TodoListRepository {
    create(data:Prisma.TodoListCreateInput) : Promise<TodoList>
    edit(title:string,id:string): Promise<TodoList | null>
    delete(idTask:string):Promise<void>
    list():Promise<TodoList[]>
    completedTask(id:string,completed:boolean):Promise<void>
    findTaskById(id:string):Promise<TodoList | null>
}