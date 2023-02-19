import { Prisma, PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import { build_controller } from "../lib/controller_builder";

type CreateReptileBody = {
    type: "feed" | "record"| "clean",
    description: String, 	
    monday: boolean, 	
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
}
const createSchedule = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {}
const getRepSchedules = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {}
const getUserSchedules = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {}

export const scheduleController = build_controller(
    "",
    [
        {path: "reptiles/schedules/:id", endpointBuilder:getRepSchedules, method:"get"},
        {path: "reptiles/schedules/:id", endpointBuilder:createSchedule, method:"post"},
        {path: "users/schedules/", endpointBuilder:getUserSchedules, method:"get"}
    ]
)

