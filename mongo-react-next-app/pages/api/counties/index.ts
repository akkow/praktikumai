import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connect from "../../../lib/mongoose";
import { GetCountiesService } from "../../../services/api/county";

export default async function counties(
    req: NextApiRequest,
    res: NextApiResponse
) {
    /* const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({error: "Reikia prisijungti"})*/
    await connect()

    const counties = await GetCountiesService()
    res.json(counties)
}