import { app } from "@/app";

import { FastifyInstance } from "fastify";


import { get } from "./get";
import { toogleCompletedTask } from "./toogleCompletedTask";


export async function todoListRoutes(app:FastifyInstance) {

  app.get("/todo-list",get)
  app.post("/todo-list",toogleCompletedTask)
  app.patch("/todo-list/:idTodoList",toogleCompletedTask)

}