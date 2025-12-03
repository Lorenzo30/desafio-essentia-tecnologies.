import { prisma } from "@/lib/prisma";
import { Prisma, TodoList } from "@prisma/client";
import { TodoListRepository } from "../todo-list-repository";

export class PrismaTodoListRepository implements TodoListRepository{

    async create(data: Prisma.TodoListCreateInput) {

        const todoListCreated = await prisma.todoList.create({data})

        return todoListCreated
    }


    async edit(data: TodoList) {

        const todoListUpdated = await prisma.todoList.update({
            where:{
                id:data.id
            },
            data
        })

        return todoListUpdated;
    }

    async delete(idTodoList:string) {
      await prisma.todoList.delete({
            where:{
                id:idTodoList
            }
        })
    }

    async list(){
      const todosList = await prisma.todoList.findMany();
      return todosList;
    }

}