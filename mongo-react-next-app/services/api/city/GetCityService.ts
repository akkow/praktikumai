import { _id } from "@next-auth/mongodb-adapter"
import { CityDto } from "../../../dto/city.dto"
import { City } from "../../../schemas/city.schema"

export async function GetCityService(id: string): Promise<CityDto> {
    const city = await City.findOne({
        _id: id,
    })
    return city
}