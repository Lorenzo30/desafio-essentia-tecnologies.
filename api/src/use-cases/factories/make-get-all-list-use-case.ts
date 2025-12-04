import { PrismaTodoListRepository } from "@/repositories/prisma/prisma-todo-list-repository";
import { GetAllList } from "../get-all-list";


export function makeGetAllListUseCase () {
    const prismaTodoListRepository = new PrismaTodoListRepository();
    const getAllListUseCase = new GetAllList(prismaTodoListRepository);

    return getAllListUseCase
    
}