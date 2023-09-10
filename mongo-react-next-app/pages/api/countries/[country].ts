import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/mongoose"
import { DeleteCountryService, GetCountryService, PutCountryService } from "../../../services/api/country";

export default async function Country(req: NextApiRequest, res: NextApiResponse) {

    await connect()
    switch (req.method) {
        case "GET": {
            const countries = await GetCountryService(req?.query?.country.toString())
            res.json(countries)
            break
        }
        case "PUT": {
            await PutCountryService(req.body)
            break
        }
        case "DELETE": {
            DeleteCountryService(req.body)
            break
        }
    }

    res.end()
}