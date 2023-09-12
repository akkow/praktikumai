import { _id } from "@next-auth/mongodb-adapter"
import { County } from "../../../schemas/county.schema"
import { CountyDto } from "../../../dto/county.dto" 

export async function GetCountyService(id: string): Promise<CountyDto> {
    const county = await County.findOne({
        _id: id,
        region_id: id
    })
    return county
}