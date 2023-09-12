import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { createUrl } from "../../utils/url"
import e from "express"
import { CountryDto } from "../../dto/country.dto"

type IProps = { 
    loadCountries: () => void
    countryDto?: CountryDto
    setCountryDto: (c: CountryDto) => void
    countries: CountryDto[]
}

export function CountryForm(props: IProps) {
    const { loadCountries, countryDto, setCountryDto, countries } = props
    const [formData, setFormData] = useState<CountryDto>({} as CountryDto)
    useEffect(() => {
        if (countryDto) setFormData(countryDto)
    }, [countryDto])

    const handleField = (e: ChangeEvent<any>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const link = formData?._id ? `api/countries/${formData._id}`: `api/countries`
        
        fetch(createUrl(link), {
            method: formData._id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then((res) => {
            if(formData?._id) setCountryDto(undefined)
            loadCountries()
            setFormData(undefined)
        })
        .catch((e) => console.log(e))

    }
    
    return (
        <form onSubmit={handleSubmit} className="grid place-items-center h-50 my-10">

            <div className="grid place-items-center w-80">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Valstybes pavadinimas</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="name" type="text" placeholder="Iveskite valstybes pavadinima" value={ formData?.name ?? "" } onChange={handleField}/>
            </div>

            <div className="grid place-items-center my-5 w-80">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Sostines pavadinimas</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="capital" type="text" placeholder="Iveskite sostines pavadinima" value={ formData?.capital ?? "" } onChange={handleField}/>
            </div>

            <div className="grid place-items-center w-80">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Valstybes plotas</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="area" type="number" placeholder="Iveskite plota" value={ formData?.area ?? "" } onChange={handleField}/>
            </div>

            <div className="grid place-items-center my-5 w-80">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Valstybes prezidentas</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="president" type="text" placeholder="Iveskite prezidenta" value={ formData?.president ?? "" } onChange={handleField}/>
            </div>

            <div className="grid place-items-center w-80">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Valstybes oficiali kalba</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="language" type="text" placeholder="Iveskite kalba" value={ formData?.language ?? "" } onChange={handleField}/>
            </div>
            
            <button className="shadow bg-blue-900 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 my-5 px-4 rounded" btn-active btn-primary id="save-btn" type="submit">Saugoti</button>
        </form>
    )
}