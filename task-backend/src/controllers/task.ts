import { Request,Response } from "express";
import {client} from '../../prisma/client.js'
export class TaskController{
    async getTasks(req:Request,res:Response){
        const tasks=await client.task.findMany({orderBy:{createdAt:'asc'}})
        res.json(tasks)
    }
    async addTask( req:Request,res:Response){
        const task=await client.task.create({data:req.body})
        res.json(task)
    }
    async deleteTask(req:Request,res:Response){ 
    const tasks=await client.task.delete({where:{id:req.params.id}})
    res.json(tasks)}
    async updateTask(req:Request,res:Response){
        const task=await client.task.update({
            where: { id: req.params.id },
            data: { ...req.body },
          })
        res.json(task)
    }
}

