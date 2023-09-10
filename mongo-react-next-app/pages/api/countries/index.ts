import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connect from "../../../lib/mongoose";
import { GetCountriesService, PostCountryService } from "../../../services/api/country";

export default async function countries(
    req: NextApiRequest,
    res: NextApiResponse
) {
   /* const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({error: "Reikia prisijungti"})*/
    await connect()
    switch (req.method) {
        case "POST": {
            PostCountryService(req.body)
            break
        }
    }

    const countries = await GetCountriesService()
    res.json(countries)
}