import fastify from "fastify";

import { PrismaClient } from "@prisma/client";
import { todoListRoutes } from "./http/controllers/todoList/routes";

const prisma = new PrismaClient();

export const app = fastify();

app.register(todoListRoutes)

