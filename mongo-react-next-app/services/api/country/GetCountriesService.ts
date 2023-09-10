import { Country } from "../../../schemas/country.schema";
import { CountryDto } from "../../../dto/country.dto";

export async function GetCountriesService(): Promise<CountryDto[]> {
    const countries = await Country.find({})
    return countries
}