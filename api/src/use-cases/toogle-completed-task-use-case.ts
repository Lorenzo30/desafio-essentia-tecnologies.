import { TodoListRepository } from "@/repositories/todo-list-repository";

interface ToogleCompletedTaskUseCaseRequest {
    id:string,
    completed:boolean
}

export class ToogleCompletedTask {
    constructor(
      private todoListRepository:TodoListRepository,
    ){}

    async execute({id,completed}:ToogleCompletedTaskUseCaseRequest) {
        await this.todoListRepository.completedTask(id,completed);
    }
}