import { Schema, model, models, Model, Document } from "mongoose"

export interface ICountry extends Document {
    _id: string
    name: string
    capital: string
    area: number
    president: string
    language: string
}

const CountrySchema = new Schema<ICountry>({
    name: {
        type: String,
        required: [true, "Įrašykite vardą"],
        maxlength: [100, "Pavadinimas iki 100 ženklų"],
    },
    capital: {
        type: String,
        required: [true, "Įrašykite sostine"],
        maxlength: [100, "Pavadinimas iki 100 ženklų"],
    },
    area: { type: Number },
    president: {
        type: String,
        required: [true, "Įrašykite prezidento varda"],
        maxlength: [100, "Pavadinimas iki 100 ženklų"],
    },
    language: {
        type: String,
        required: [true, "Įrašykite kalba"],
        maxlength: [100, "Pavadinimas iki 100 ženklų"],
    },
});

export const Country: Model<ICountry, {}, {}, {}, any> = 
    models.countries || model<ICountry>("countries", CountrySchema);