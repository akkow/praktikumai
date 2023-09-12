import { Schema, model, models, Document, Model } from "mongoose";

export interface ICounty extends Document {
    _id: string
    name: string
    region_id: string
}

const CountySchema = new Schema<ICounty>({
    _id: { type: String },
    name: { type: String },
    region_id: { type: String }
});

export const County: Model<ICounty, {}, {}, {}, any> = 
    models.counties || model<ICounty>("counties", CountySchema)