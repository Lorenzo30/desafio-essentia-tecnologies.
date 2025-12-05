import { PrismaTodoListRepository } from "@/repositories/prisma/prisma-todo-list-repository";
import { DeleteTaskUseCase } from "../delete-task-use-case";


export function makeDeleteTaskUseCase () {
    const prismaTodoListRepository = new PrismaTodoListRepository();
    const createTodoListUseCase = new DeleteTaskUseCase(prismaTodoListRepository);

    return createTodoListUseCase
    
}