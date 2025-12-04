import { PrismaTodoListRepository } from "@/repositories/prisma/prisma-todo-list-repository";
import { ToogleCompletedTask } from "../toogle-completed-task-use-case";


export function makeToogleCompletedTaskUseCase () {
    const prismaTodoListRepository = new PrismaTodoListRepository();
    const getAllListUseCase = new ToogleCompletedTask(prismaTodoListRepository);

    return getAllListUseCase
    
}