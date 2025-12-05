import { PrismaTodoListRepository } from "@/repositories/prisma/prisma-todo-list-repository";
import { GetAllList } from "../get-all-list";
import { CreateTodoListUseCase } from "../create-todo-list-use-case";


export function makeCreateTodoListUseCase () {
    const prismaTodoListRepository = new PrismaTodoListRepository();
    const createTodoListUseCase = new CreateTodoListUseCase(prismaTodoListRepository);

    return createTodoListUseCase
    
}