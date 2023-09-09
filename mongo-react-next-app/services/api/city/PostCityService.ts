import { CityDto } from "../../../dto/city.dto"
import { City } from "../../../schemas/city.schema"

export async function PostCityService(city: CityDto): Promise<void> {
    await City.create(city)
}