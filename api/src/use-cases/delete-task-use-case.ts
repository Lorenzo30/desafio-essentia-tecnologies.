import { TodoListRepository } from "@/repositories/todo-list-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface DeleteTaskUseCaseRequest {
    id:string
}

export class DeleteTaskUseCase {
    constructor(
      private todoListRepository:TodoListRepository,
    ){}

    async execute({id}:DeleteTaskUseCaseRequest)  {
        const task = await this.todoListRepository.findTaskById(id)
        if (!task) {
            throw new ResourceNotFoundError();
        }
        const todoList = await this.todoListRepository.delete(id);
        return {todoList};
    }
}