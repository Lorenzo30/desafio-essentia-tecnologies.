import { app } from "@/app";

import { FastifyInstance } from "fastify";

import { create } from "./create";
import { get } from "./get";
import { deleteList } from "./delete";
import { update } from "./update";

export async function todoListRoutes(app:FastifyInstance) {

  app.get("/todo-list/:idList",get)
  app.delete("/todo-list/:idList",deleteList)

  app.post("/todo-list/create",create);
  app.put("/todo-list/edit/:idList",update)

}