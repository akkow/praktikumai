import { Schema, model, models, Model, Document } from "mongoose"

export interface ICity extends Document {
    _id: string
    name: string
    population: number
}

const CitySchema = new Schema<ICity>({
    name: {
        type: String,
        required: [true, "Įrašykite vardą"],
        maxlength: [100, "Pavadinimas iki 100 ženklų"],
    },
    population: { type: Number, required: true}
});

export const City: Model<ICity, {}, {}, {}, any> = 
    models.cities || model<ICity>("cities", CitySchema);