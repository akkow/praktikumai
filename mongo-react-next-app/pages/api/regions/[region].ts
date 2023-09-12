import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/mongoose"
import { GetRegionService } from "../../../services/api/region";

export default async function Region(req: NextApiRequest, res: NextApiResponse) {

    await connect()
    switch (req.method) {
        case "GET": {
            const regions = await GetRegionService(req?.query?.region.toString())
            res.json(regions)
            break
        }
    }

    res.end()
}