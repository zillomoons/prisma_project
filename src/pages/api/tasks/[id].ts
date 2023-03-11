import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const taskId = parseInt(req.query.id as string);
    const { name } = JSON.parse(req.body);
    const result = await prisma.task.update({
      where: { id: taskId },
      data: {name},
    })
    res.status(200).json(result);
  } 

  if (req.method === 'DELETE') {
    const taskId = parseInt(req.query.id as string)
    const result = await prisma.task.delete({
      where: {id: taskId},
    })
    res.status(200).json(result);
  }
  
}