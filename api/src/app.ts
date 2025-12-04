import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { todoListRoutes } from "./http/controllers/todoList/routes";

const prisma = new PrismaClient();

export const app = fastify();

app.register(cors, {
    origin: "http://localhost:4200", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

app.register(todoListRoutes)

