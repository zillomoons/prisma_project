import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, projectId } = req.body;
  const result = await prisma.task.create({
    data: {
      name,
      project: {
        connect: {
          id: parseInt(projectId)
        }
      }
    }
  });
  res.status(200).json(result)
}