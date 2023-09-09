import { CityDto } from "../../../dto/city.dto";
import { City } from "../../../schemas/city.schema";
import { ObjectId } from "mongodb";

export async function PutCityService(city: CityDto): Promise<void> {
    await City.updateOne(
        { _id: new ObjectId(city._id) },
        { $set: { name: city.name, population: city.population} }
    )
}