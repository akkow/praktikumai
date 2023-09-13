import { _id } from "@next-auth/mongodb-adapter"
import { Region } from "../../../schemas/region.schema"
import { RegionDto } from "../../../dto/region.dto"

export async function GetRegionService(id: string): Promise<RegionDto> {
    const regions = await Region.findOne({_id: id})
    return regions
}