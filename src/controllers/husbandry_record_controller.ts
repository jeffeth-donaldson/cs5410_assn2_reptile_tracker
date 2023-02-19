import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import { build_controller } from "../lib/controller_builder";

type CreateHusbandryRecordBody = {
    length: number,
    weight: number,
    temperature: number,
    humidity: number
}

const CreateHusbandryRecord = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const {length, weight, temperature, humidity} = req.body as CreateHusbandryRecordBody;
    const husbandryRecord = await client.husbandryRecord.create({
        data: {
            length,
            weight,
            temperature,
            humidity,
            reptileId: req.jwtBody?.userId!!
        }
    });

    res.json({husbandryRecord});
}

const getHusbandryRecords = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const husbandryRecords = await client.husbandryRecord.findMany({
        where: {
            reptileId: req.jwtBody?.userId
        }
    });
    res.json(husbandryRecords);
}

export const husbandryRecordController= build_controller(
    "husbandryRecords",
    [
        {path: "/", endpointBuilder:CreateHusbandryRecord, method:"post"},
        {path:"/mine", endpointBuilder:getHusbandryRecords, method:"get"}
    ]
)