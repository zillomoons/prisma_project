import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const taskId = parseInt(req.query.id as string);

  const result = await prisma.task.update({
    where: { id: taskId },
    data: { completedDateTime: null }
  });
  res.json(result);
}