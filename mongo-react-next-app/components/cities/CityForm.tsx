import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Button, Form, FormGroup } from "react-bootstrap"
import { createUrl } from "../../utils/url"
import { CityDto } from "../../dto/city.dto"

type IProps = { 
    loadCities: () => void
    cityDto?: CityDto
    setCityDto: (c: CityDto) => void
}

export function CityForm(props: IProps) {
    const { loadCities, cityDto, setCityDto } = props
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
        .then((r) => {
            if(formData?._id) setCityDto(undefined)
            loadCities()
            setFormData(undefined)
        })
        .catch((e) => console.log(e))

    }
    
    return (
        <Form onSubmit={handleSubmit} className="mb-5">
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Miesto pavadinimas</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Iveskite pavadinima" 
                value={ formData?.name ?? "" }
                onChange={handleField} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="population">
                <Form.Label>Gyventojų skaičius</Form.Label>
                <Form.Control 
                type="number"
                placeholder="Iveskite skaiciu"
                value={ formData?.population ?? "" }
                onChange={handleField} />
            </Form.Group>
            <Button variant="primary" type="submit">Saugoti</Button> 
        </Form>
    )
}