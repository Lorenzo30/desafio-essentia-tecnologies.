
import { TodoList } from "@prisma/client";
import { TodoListRepository } from "@/repositories/todo-list-repository";

interface GetAllListResponse {
  listTodoList:TodoList[]
}


export class GetAllList {
    constructor(
      private todoListRepository:TodoListRepository,
    ){}

    async execute() : Promise<GetAllListResponse>{
        const listTodoList = await this.todoListRepository.list();
        return {listTodoList}
    }
}