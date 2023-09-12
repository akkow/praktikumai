import { Schema, model, models, Document, Model } from "mongoose";

export interface IRegion extends Document {
    _id: string
    name: string
}

const RegionSchema = new Schema<IRegion>({
    _id: { type: String },
    name: { type: String },
});

export const Region: Model<IRegion, {}, {}, {}, any> = 
    models.regions || model<IRegion>("regions", RegionSchema);