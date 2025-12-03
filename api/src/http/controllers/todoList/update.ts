
import { FastifyReply,FastifyRequest } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function update (request:FastifyRequest,reply:FastifyReply) {

    try {
        const getUserMetricsUseCase = makeGetUserMetricsUseCase();
        const {checkInsCount} = await getUserMetricsUseCase.execute({
            userId:request.user.sub
        });

        reply.status(200).send({
            checkInsCount
        })
        
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}