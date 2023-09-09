import { CityDto } from "../../../dto/city.dto"
import { City } from "../../../schemas/city.schema"

export async function GetCitiesService(): Promise<CityDto[]> {
    const cities = await City.find({})
    return cities
}