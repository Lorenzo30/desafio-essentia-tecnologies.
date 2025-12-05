import { ResourceNotFoundError } from "@/use-cases/error/resource-not-found-error";
import { makeDeleteTaskUseCase } from "@/use-cases/factories/make-delete-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
;


export async function deleteTask (request:FastifyRequest,reply:FastifyReply) {

    try {

        const deleteTaskSchema = z.object({
            idTodoList: z.string(),
        })

        const { idTodoList } = deleteTaskSchema.parse(request.params)
        const deleteTaskUseCase = makeDeleteTaskUseCase();
        await deleteTaskUseCase.execute({id:idTodoList});
       
    } catch (e) {
        if (e instanceof ResourceNotFoundError) {
            return reply.status(404).send({message:e.message})
        }

        throw e;
       
    }

    return reply.status(200).send();

}