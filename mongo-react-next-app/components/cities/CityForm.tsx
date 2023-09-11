import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { createUrl } from "../../utils/url"
import { CityDto } from "../../dto/city.dto"
import e from "express"

type IProps = { 
    loadCities: () => void
    cityDto?: CityDto
    setCityDto: (c: CityDto) => void
    cities: CityDto[]
}

export function CityForm(props: IProps) {
    const { loadCities, cityDto, setCityDto, cities } = props
    const [formData, setFormData] = useState<CityDto>({} as CityDto)
    useEffect(() => {
        if (cityDto) setFormData(cityDto)
    }, [cityDto])

    const handleField = (e: ChangeEvent<any>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const link = formData?._id ? `api/cities/${formData._id}`: `api/cities`
        
        fetch(createUrl(link), {
            method: formData._id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then((res) => {
            if(formData?._id) setCityDto(undefined)
            loadCities()
            setFormData(undefined)
        })
        .catch((e) => console.log(e))

    }
    
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg md:flex md:items-center mb-6">

            <div className="w-full md:w-1/2 px-3 md:items-center mb-8">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">Miesto Pavadinimas</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" type="text" placeholder="Iveskite pavadinima" value={ formData?.name ?? "" } onChange={handleField}/>
            </div>

            <div className="w-full md:w-1/2 px-3 md:items-center mb-8">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">Gyventojų skaičius</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="population" type="number" placeholder="Iveskite gyventojų skaičių" value={ formData?.population ?? "" } onChange={handleField}/>
            </div>
            
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" btn-active btn-primary id="save-btn" type="submit">Saugoti</button>
        </form>
    )
}