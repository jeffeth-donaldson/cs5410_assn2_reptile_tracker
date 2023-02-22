import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import { build_controller } from "../lib/controller_builder";

type CreateFeedingBody = {
    foodItem: "large mouse" | "medium rat" | "medium rabbit",
}

const createFeeding = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const {foodItem} = req.body as CreateFeedingBody;
    const feeding = await client.feeding.create({
        data: {
            foodItem,
            reptileId: parseInt(req.params.id)
        }
    });

    res.json({feeding});
}

const getReptileFeedings = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptile = await client.reptile.findFirst({
        where: {
            userId: req.jwtBody?.userId,
            id: parseInt(req.params.id)
        }
    });
    if (!reptile){
        res.status(404).json({message:"Reptile not found"});
    } else {
        const feedings = await client.feeding.findMany({
            where: {
                reptileId: parseInt(req.params.id)
            }
        });

    res.json(feedings);
    }
}

export const feedingController = build_controller(
    "feedings",
    [
        {path: "/:id", endpointBuilder:createFeeding, method:"post"},
        {path:"/:id", endpointBuilder:getReptileFeedings, method:"get"}
    ]
)