import { prisma } from "@/lib/prisma";
import { FastifyReply,FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCheckInUseCase } from "@/use-cases/factories/makecheck-in-use-case";

export async function create (request:FastifyRequest,reply:FastifyReply) {

    const createCheckInParamsSchema = z.object({
        gymId:z.string().uuid()
    })

    const createCheckInBodySchema = z.object({
        latitude:z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude:z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const {gymId} = createCheckInParamsSchema.parse(request.params)
    const {latitude,longitude} = createCheckInBodySchema.parse(request.body);

    try {
        const createCheckIn = makeCheckInUseCase();
        await createCheckIn.execute({gymId,latitude,longitude,userId:request.user.sub});
    } catch (e) {
        throw e;
       
    }

    return reply.status(201).send();
}