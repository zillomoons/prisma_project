import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;
  const result = await prisma.project.create({
    data: {
      name,
    }
  })
  res.status(200).json(result);
}