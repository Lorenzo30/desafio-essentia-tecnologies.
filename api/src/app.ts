import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { todoListRoutes } from "./http/controllers/todoList/routes";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const app = fastify();

app.register(cors, {
    origin: "http://localhost:4200", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

app.register(todoListRoutes)

app.setErrorHandler((error,_,reply) => {
  if (error instanceof ZodError) {
       return reply.status(400)
       .send({message:"validation error",issues:error.format()})
  }
 
  return reply.status(500).send({message:"Internal server error"})
})


