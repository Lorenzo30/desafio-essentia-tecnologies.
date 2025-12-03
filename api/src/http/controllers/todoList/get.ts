import { prisma } from "@/lib/prisma";
import { FastifyReply,FastifyRequest } from "fastify";;
import { z } from "zod";

import { makeValidatedCheckInUseCase } from "@/use-cases/factories/make-validated-check-use-case";

export async function get (request:FastifyRequest,reply:FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId:z.string().uuid()
    })

    const {checkInId} = validateCheckInParamsSchema.parse(request.params)

    try {
        const validateCheckInUseCase = makeValidatedCheckInUseCase();
        await validateCheckInUseCase.execute({checkInId});
    } catch (e) {
        throw e;
       
    }

    return reply.status(204).send();
}