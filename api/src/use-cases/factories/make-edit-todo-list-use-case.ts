import { PrismaTodoListRepository } from "@/repositories/prisma/prisma-todo-list-repository";
import { EditTaskCase } from "../edit-task-use-case";


export function makeEditTaskUseCase () {
    const prismaTodoListRepository = new PrismaTodoListRepository();
    const createTodoListUseCase = new EditTaskCase(prismaTodoListRepository);

    return createTodoListUseCase
    
}