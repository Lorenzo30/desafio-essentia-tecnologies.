import { prisma } from "@/lib/prisma";
import { Prisma, TodoList } from "@prisma/client";
import { TodoListRepository } from "../todo-list-repository";

export class PrismaTodoListRepository implements TodoListRepository{

    async create(data: Prisma.TodoListCreateInput) {

        const todoListCreated = await prisma.todoList.create({data})

        return todoListCreated
    }


    async edit(id:string,title:string) {

        console.log(id,"iddd");
        console.log(title,"titleee")

        const todoListUpdated = await prisma.todoList.update({
            where:{
                id
            },
            data:{
                title
            }
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

    async completedTask(idTodoList:string,completed:boolean){
        const todoListUpdated = await prisma.todoList.update({
            where:{
                id:idTodoList
            },
            data:{
                checked:completed
            }
        })
    }

    async findTaskById(id: string): Promise<TodoList | null> {
        const task = await prisma.todoList.findUnique({
            where:{
                id
            }
        })

        return task
    }

}