import { Prisma, PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import { build_controller } from "../lib/controller_builder";

type CreateScheduleBody = {
    type: "feed" | "record" | "clean",
    description: string, 	
    monday: boolean, 	
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
}
const createSchedule = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptile = await client.reptile.findFirst({
        where: {
            userId: req.jwtBody?.userId,
            id: parseInt(req.params.id)
        }
    });
    if (!reptile){
        res.status(404).json({message:"Reptile not found"});
    } else {
        const {type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body  as CreateScheduleBody;
        const schedule = await client.schedule.create({
            data: {
                type,
                description,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                userId: req.jwtBody?.userId!!,
                reptileId: parseInt(req.params.id)
            }
        });
        res.json({schedule})
    }
}
const getUserSchedules = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const schedules = await client.schedule.findMany({
        where: {
            userId: req.jwtBody?.userId!!
        }
    });
    res.json(schedules);
}

const getRepSchedules = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptile = await client.reptile.findFirst({
        where: {
            userId: req.jwtBody?.userId,
            id: parseInt(req.params.id)
        }
    });
    if (!reptile){
        res.status(404).json({message:"Reptile not found"});
    } else {
        const schedules = await client.schedule.findMany({
            where: {
                reptileId: parseInt(req.params.id)
            }
        });
        res.json(schedules);
    }
}


export const scheduleController = build_controller(
    "schedules",
    [
        {path: "/mine", endpointBuilder:getUserSchedules, method:"get"},
        {path: "/:id", endpointBuilder:getRepSchedules, method:"get"},
        {path: "/:id", endpointBuilder:createSchedule, method:"post"}
    ]
)

