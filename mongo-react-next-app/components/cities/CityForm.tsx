import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { createUrl } from "../../utils/url"
import { CityDto } from "../../dto/city.dto"
import { CountyDto } from "../../dto/county.dto"
import e from "express"
import { RegionDto } from "../../dto/region.dto"

type IProps = { 
    loadCities: () => void
    cityDto?: CityDto
    setCityDto: (c: CityDto) => void
    cities: CityDto[]

    setCountyDto: (c: CountyDto) => void
    countyDto?: CountyDto
    counties: CountyDto[]

    setRegionDto: (c: RegionDto) => void
    regionDto?: RegionDto
    regions: RegionDto[]
}

export function CityForm(props: IProps) {
    const { loadCities, cityDto, setCityDto } = props
    const [formData, setFormData] = useState<CityDto>({} as CityDto)
    useEffect(() => {
        if (cityDto) setFormData(cityDto)
    }, [cityDto])

    /*useEffect(() => {
        fetch(regions)

        fetch(counties)
    })*/

    const handleField = (e: ChangeEvent<any>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        document.getElementById("county-div").style.visibility = "visible"
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
        <form onSubmit={handleSubmit} className="grid place-items-center h-50 my-10">

            <div className="grid place-items-center w-60">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Miesto Pavadinimas</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="name" type="text" placeholder="Iveskite pavadinima" value={ formData?.name ?? "" } onChange={handleField}/>
            </div>

            <div className="grid place-items-center my-5 w-60">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Gyventojų skaičius</label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="population" type="number" placeholder="Iveskite gyventojų skaičių" value={ formData?.population ?? "" } onChange={handleField}/>
            </div>

            <div className="grid place-items-center my-5 w-60">
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Regionas</label>
                <select className="select bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="region"  onChange={handleField}>
                    <option>Regionas</option>
                </select>
            </div>
            <div className="hidden grid place-items-center my-5 w-60" id="county-div"> 
                <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 text-center">Apskritis</label>
                <select className="select bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="county" onChange={handleField}>
                    <option>Apskritis</option>
                </select>
            </div>
            
            <button className="shadow bg-blue-900 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" btn-active btn-primary id="save-btn" type="submit">Saugoti</button>
        </form>
    )
}