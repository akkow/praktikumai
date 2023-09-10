import { Country } from "../../../schemas/country.schema";
import { CountryDto } from "../../../dto/country.dto";
import { _id } from "@next-auth/mongodb-adapter";

export async function DeleteCountryService(country: CountryDto): Promise<void> {
        const res = await Country.deleteOne( { _id: country._id } )
        console.log(res)
}