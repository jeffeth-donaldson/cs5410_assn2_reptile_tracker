import { Prisma, PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import { build_controller } from "../lib/controller_builder";

type CreateReptileBody = {
    species: "ball_python" | "king_snake" | "corn_snake" | "redtail_boa",
    name: string,
    sex: "m" | "f"
}
const createReptile = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const {species, name, sex} = req.body as CreateReptileBody;
    const reptile = await client.reptile.create({
        data: {
            species,
            name,
            sex,
            userId: req.jwtBody?.userId!!
        }
    });

    res.json({reptile})
}

const deleteReptile = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptile = await client.reptile.findFirst({
        where: {
            userId: req.jwtBody?.userId,
            id: parseInt(req.params.id)
        }
    })

    if (!reptile) {
        res.status(404).json({message:"Reptile not found"})
    } else {
        const deletedFeedings = await client.feeding.deleteMany({
            where:{
                reptileId:reptile.id
            }
        });
        const deletedHusbandryRecords = await client.husbandryRecord.deleteMany({
            where:{
                reptileId:reptile.id
            }
        });
        const deletedSchedules = await client.schedule.deleteMany({
            where:{
                reptileId:reptile.id
            }
        });
        const deletedReptile = await client.reptile.delete({
            where:{
                id:reptile.id
            }
        });
        res.json({message:"Deleted Successfully.",reptile})
    }
}

const updateReptile = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptile = await client.reptile.findFirst({
        where: {
            userId: req.jwtBody?.userId,
            id: parseInt(req.params.id)
        }
    });

    if (!reptile) {
        res.status(404).json({message:"Reptile not found"})
    } else {
        const updatedReptile = await client.reptile.update({
            where: {
                id: reptile.id,
            },
            data: {
                species: req.body.species || reptile.species,
                name: req.body.name || reptile.name,
                sex: req.body.sex || reptile.sex
            }
        });
        res.json({message:"Updated Successfully.",updatedReptile})
    }
}

const getUserReptiles = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptiles = await client.reptile.findMany({
        where: {
            userId: req.jwtBody?.userId
        }
    });
    res.json(reptiles);
}

const getUserReptile = (client:PrismaClient):RequestHandler => async (req:RequestWithJWTBody, res) => {
    const reptile = await client.reptile.findFirst({
        where: {
            userId: req.jwtBody?.userId,
            id: parseInt(req.params.id)
        }
    });
    res.json(reptile);
}



export const reptileController = build_controller(
    "reptiles",
    [
        {path: "/", endpointBuilder:createReptile, method:"post"},
        {path:"/:id", endpointBuilder:deleteReptile, method:"delete"},
        {path:"/:id", endpointBuilder:updateReptile, method:"put"},
        {path:"/:id", endpointBuilder:getUserReptile, method:"get"},
        {path:"/mine", endpointBuilder:getUserReptiles, method:"get"}
    ]
)