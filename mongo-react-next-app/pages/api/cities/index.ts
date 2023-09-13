import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connect from "../../../lib/mongoose";
import { GetCitiesService, PostCityService } from "../../../services/api/city";
import bcrypt from "bcryptjs"

export default async function Cities(
    req: NextApiRequest,
    res: NextApiResponse
) {
    /*
    const myPlaintextPassword = 'reactpassword'

    bcrypt.genSalt(Number(process.env.SALT_ROUNDS), function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            console.log(hash)
        });
    });
    */
    await connect()
    switch (req.method) {
        case "POST": {
            PostCityService(req.body)
            break
        }
    }

    const cities = await GetCitiesService()
    res.json(cities)
}