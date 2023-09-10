import { Country } from "../../../schemas/country.schema";
import { CountryDto } from "../../../dto/country.dto";
import { ObjectId } from "mongodb";

export async function PutCountryService(country: CountryDto): Promise<void> {
    await Country.updateOne(
        { _id: new ObjectId(country._id) },
        { $set: 
            { 
            name: country.name, 
            capital: country.capital, 
            area: country.area, 
            president: country.president, 
            language: country.language 
            } }
    )
}