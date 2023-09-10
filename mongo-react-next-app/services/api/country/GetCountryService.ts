import { _id } from "@next-auth/mongodb-adapter"
import { Country } from "../../../schemas/country.schema";
import { CountryDto } from "../../../dto/country.dto";

export async function GetCountryService(id: string): Promise<CountryDto> {
    const country = await Country.findOne({
        _id: id,
    })
    return country
}