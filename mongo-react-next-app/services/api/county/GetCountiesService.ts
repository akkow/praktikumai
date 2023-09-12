import { CountyDto } from "../../../dto/county.dto"
import { County } from "../../../schemas/county.schema" 

export async function GetCountiesService(): Promise<CountyDto[]> {
    const counties = await County.find({})
    return counties
}