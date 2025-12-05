
import { TodoList } from "@prisma/client";
import { TodoListRepository } from "@/repositories/todo-list-repository";

interface EditTodoListRequest {
    id:string
    title: string
}


interface EditTodoListResponse {
    todoList:TodoList | null
}


export class EditTaskCase {
    constructor(
      private todoListRepository:TodoListRepository,
    ){}

    async execute({id,title}:EditTodoListRequest) : Promise<EditTodoListResponse> {
        const todoListUpdated = await this.todoListRepository.edit(id,title);
        return {todoList:todoListUpdated};
    }
}