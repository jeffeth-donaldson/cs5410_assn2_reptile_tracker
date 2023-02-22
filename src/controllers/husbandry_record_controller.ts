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
            reptileId: parseInt(req.params.id)
        }
    });

    res.json({husbandryRecord});
}

const getHusbandryRecords = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptile = await client.reptile.findFirst({
        where: {
            userId: req.jwtBody?.userId,
            id: parseInt(req.params.id)
        }
    });

    if (!reptile){
        res.status(404).json({message:"Reptile not found"});
    } else {
        const husbandryRecords = await client.husbandryRecord.findMany({
            where: {
                reptileId: parseInt(req.params.id)
            }
        });

    res.json(husbandryRecords);
    }
}

export const husbandryRecordController= build_controller(
    "husbandryRecords",
    [
        {path: "/:id", endpointBuilder:CreateHusbandryRecord, method:"post"},
        {path:"/:id", endpointBuilder:getHusbandryRecords, method:"get"}
    ]
)