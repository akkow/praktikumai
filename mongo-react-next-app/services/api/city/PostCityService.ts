import { CityDto } from "../../../dto/city.dto"
import { City } from "../../../schemas/city.schema"

export async function PostCityService(city: CityDto): Promise<void> {
    const isCityFound = await City.findOne({name: city.name})
    if(isCityFound){
        console.log("city with same name was found..")
    } else  { await City.create(city) }
}