import { app } from "@/app";

import { FastifyInstance } from "fastify";


import { get } from "./get";
import { toogleCompletedTask } from "./toogleCompletedTask";
import { create } from "./create";
import { deleteTask } from "./delete";
import { editTask } from "./edit";


export async function todoListRoutes(app:FastifyInstance) {

  app.get("/todo-list",get)
  app.put("/todo-list/:idTodoList",editTask)
  app.delete("/todo-list/:idTodoList",deleteTask)
  app.post("/todo-list",create)
  app.patch("/todo-list/:idTodoList",toogleCompletedTask)

}