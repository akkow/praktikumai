"use client"
import { useEffect, useState } from "react"
import { createUrl } from "../../utils/url"
import { CountryDto } from "../../dto/country.dto"
import { CountryForm } from "../../components/countries/CountryForm"
import { CountryList } from "../../components/countries/CountryList"

export default function Cities() {
    const [countries, setCountries] = useState<CountryDto[]>([])
    const [countryDto, setCountryDto] = useState<CountryDto | undefined>()

    const loadCountries = () => {
        fetch(createUrl(`api/countries`), {
            cache: "no-store",
        })
        .then((r) => r.json())
        .then((c) => setCountries(c))
    }

    useEffect(() => {
        loadCountries()
    }, [])

    return (
        <div>
            <CountryForm {...{ loadCountries, countryDto, setCountryDto, countries }} />
            <CountryList {...{ countries, setCountryDto, countryDto, loadCountries }} />
        </div>
    )
}