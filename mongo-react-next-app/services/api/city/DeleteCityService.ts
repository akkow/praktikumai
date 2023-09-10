import { City } from "../../../schemas/city.schema";
import { CityDto } from "../../../dto/city.dto";
import { _id } from "@next-auth/mongodb-adapter";

export async function DeleteCityService(city: CityDto): Promise<void> {
        const res = await City.deleteOne( { _id: city._id } )
        console.log(res)
}