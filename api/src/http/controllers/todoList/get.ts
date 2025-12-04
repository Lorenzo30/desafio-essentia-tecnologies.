import { makeGetAllListUseCase } from "@/use-cases/factories/make-get-all-list-use-case";
import { FastifyReply,FastifyRequest } from "fastify";;


export async function get (request:FastifyRequest,reply:FastifyReply) {

    try {
        const getAllListUseCase = makeGetAllListUseCase();
        const list = await getAllListUseCase.execute();
        reply.status(200).send(list);
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();

}