import { Country } from "../../../schemas/country.schema";
import { CountryDto } from "../../../dto/country.dto";

export async function PostCountryService(country: CountryDto): Promise<void> {
    const isCountryFound = await Country.findOne({name: country.name})
    if(isCountryFound){
        console.log("country with same name was found..")
    } else  { await Country.create(country) }
}