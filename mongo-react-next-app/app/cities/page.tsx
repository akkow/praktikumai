"use client"
import { CityForm } from "../../components/cities/CityForm"
import { CityList } from "../../components/cities/CityList"
import { useEffect, useState } from "react"
import { createUrl } from "../../utils/url"
import { CityDto } from "../../dto/city.dto"

export default function Cities() {
    const [cities, setCities] = useState<CityDto[]>([])
    const [cityDto, setCityDto] = useState<CityDto | undefined>()

    const loadCities = () => {
        fetch(createUrl(`api/cities`), {
            cache: "no-store",
        })
        .then((r) => r.json())
        .then((c) => setCities(c))
    }

    useEffect(() => {
        loadCities()
    }, [])

    return (
        <div>
            <CityForm {...{ loadCities, cityDto, setCityDto, cities }} />
            <CityList {...{ cities, setCityDto, cityDto, loadCities }} />
        </div>
    )
}