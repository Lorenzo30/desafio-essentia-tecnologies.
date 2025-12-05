
import { TodoList } from "@prisma/client";
import { TodoListRepository } from "@/repositories/todo-list-repository";

interface CreateTodoListRequest {
    title: string;
}


interface CreateTodoListResponse {
    todoList:TodoList
}


export class CreateTodoListUseCase {
    constructor(
      private todoListRepository:TodoListRepository,
    ){}

    async execute({title}:CreateTodoListRequest) : Promise<CreateTodoListResponse> {
        const todoList = await this.todoListRepository.create({title});
        return {todoList};
    }
}