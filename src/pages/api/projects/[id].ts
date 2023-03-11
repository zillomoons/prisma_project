import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const projectId = parseInt(req.query.id as string);
    const { name } = JSON.parse(req.body);
    const result = await prisma.project.update({
      where: { id: projectId },
      data: {name},
    })
    res.status(200).json(result);
  } 

  if (req.method === 'DELETE') {
    const projectId = parseInt(req.query.id as string)
    const result = await prisma.project.delete({
      where: {id: projectId},
    })
    res.status(200).json(result);
  }
  
}