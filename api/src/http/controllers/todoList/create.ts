import { makeCreateTodoListUseCase } from "@/use-cases/factories/make-create-todo-list-use-case";
import { makeGetAllListUseCase } from "@/use-cases/factories/make-get-all-list-use-case";
import { FastifyReply,FastifyRequest } from "fastify";import { title } from "process";
import { z } from "zod";
;


export async function create (request:FastifyRequest,reply:FastifyReply) {

    try {

        const createTaskValidateSchema = z.object({
            title: z.string(),
        })

        const { title } = createTaskValidateSchema.parse(request.body)

        const createTaskUseCase = makeCreateTodoListUseCase();
        const list = await createTaskUseCase.execute({title});
        reply.status(201).send(list);
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();

}