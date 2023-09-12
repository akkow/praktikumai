import { RegionDto } from "../../../dto/region.dto"
import { Region } from "../../../schemas/region.schema" 

export async function GetRegionsService(): Promise<RegionDto[]> {
    const regions = await Region.find({})
    return regions
}