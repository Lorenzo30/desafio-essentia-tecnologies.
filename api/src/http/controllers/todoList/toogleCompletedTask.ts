import { makeToogleCompletedTaskUseCase } from "@/use-cases/factories/make-toogle-completed-task-use-case";
import { FastifyReply, FastifyRequest } from "fastify";import { z } from "zod";
;


export async function toogleCompletedTask(request: FastifyRequest, reply: FastifyReply) {

    try {
        
        const validateToogleTodoListSchemaBody = z.object({
            completed: z.boolean()
        })

        const validateToogleTodoListSchemaParams = z.object({
            idTodoList: z.string()
        })

     
        const { idTodoList } = validateToogleTodoListSchemaParams.parse(request.params)
        const { completed } = validateToogleTodoListSchemaBody.parse(request.body);

        const toogleCompletedTask = makeToogleCompletedTaskUseCase();
        await toogleCompletedTask.execute({id:idTodoList, completed});
        reply.status(200).send();
    } catch (e) {
        throw e;

    }

    return reply.status(201).send();

}