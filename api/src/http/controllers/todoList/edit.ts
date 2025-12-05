import { makeEditTaskUseCase } from "@/use-cases/factories/make-edit-todo-list-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
;


export async function editTask (request:FastifyRequest,reply:FastifyReply) {

    try {

        const editTaskSchemaParams = z.object({
            idTodoList:z.string()
        })


        const editTaskSchemaBody = z.object({
            title:z.string()
        })

        const { idTodoList } = editTaskSchemaParams.parse(request.params)
        const { title } = editTaskSchemaBody.parse(request.body)

        const editTaskUseCase = makeEditTaskUseCase();
        const list = await editTaskUseCase.execute({id:idTodoList,title});
        reply.status(201).send(list);
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();

}