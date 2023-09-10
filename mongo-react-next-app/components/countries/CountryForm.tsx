import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Button, Form, FormGroup } from "react-bootstrap"
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
        <Form onSubmit={handleSubmit} className="mb-5">
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Valstybes pavadinimas</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Iveskite valstybes pavadinima" 
                value={ formData?.name ?? "" }
                onChange={handleField} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="capital">
                <Form.Label>Sostines pavadinimas</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Iveskite sostines pavadinima"
                value={ formData?.capital ?? "" }
                onChange={handleField} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="area">
                <Form.Label>Valstybes plotas</Form.Label>
                <Form.Control 
                type="number"
                placeholder="Iveskite plota"
                value={ formData?.area ?? "" }
                onChange={handleField} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="president">
                <Form.Label>Valstybes prezidentas</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Iveskite valstybes prezidenta"
                value={ formData?.president ?? "" }
                onChange={handleField} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="language">
                <Form.Label>Valstybes oficiali kalba</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Iveskite valstybes oficialia kalba"
                value={ formData?.language ?? "" }
                onChange={handleField} />
            </Form.Group>
            <Button variant="primary" type="submit">Saugoti</Button> 
        </Form>
    )
}