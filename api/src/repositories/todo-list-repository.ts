import { Prisma, TodoList } from "@prisma/client";

export interface TodoListRepository {
    create(data:Prisma.TodoListCreateInput) : Promise<TodoList>
    edit(id:TodoList): Promise<TodoList | null>
    delete(userId:string,date:Date):Promise<void>
    list():Promise<TodoList[]>
    completedTask(id:string,completed:boolean):Promise<void>
}