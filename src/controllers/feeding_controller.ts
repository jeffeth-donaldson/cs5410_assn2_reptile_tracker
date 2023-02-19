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
            reptileId: req.jwtBody?.userId!!
        }
    });

    res.json({feeding});
}

const getReptileFeedings = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const feedings = await client.feeding.findMany({
        where: {
            reptileId: req.jwtBody?.userId
        }
    });
    res.json(feedings);
}

export const feedingController = build_controller(
    "feedings",
    [
        {path: "/", endpointBuilder:createFeeding, method:"post"},
        {path:"/mine", endpointBuilder:getReptileFeedings, method:"get"}
    ]
)