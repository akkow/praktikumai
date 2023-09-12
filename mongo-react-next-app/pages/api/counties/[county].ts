import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/mongoose"
import { GetCountyService } from "../../../services/api/county";

export default async function County(req: NextApiRequest, res: NextApiResponse) {

    await connect()
    switch (req.method) {
        case "GET": {
            const counties = await GetCountyService(req?.query?.city.toString())
            res.json(counties)
            break
        }
    }
    
    res.end()
}