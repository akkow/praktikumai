import { Button, ButtonGroup, Table } from "react-bootstrap";
import { CityDto } from "../../dto/city.dto";
import { createUrl } from "../../utils/url";

type IProps = { 
    cities: CityDto[]
    setCityDto: (c: CityDto) => void
    cityDto?: CityDto
    loadCities: () => void
}

export function CityList(props: IProps) {

    const { cities, setCityDto, cityDto, loadCities } = props

    // Change button
    const handleFillForm = (city: CityDto) => {
        setCityDto(city)
    }

    // Delete button
    const handleDeleteFromList = (city: CityDto) => {
        console.log(city)

        const link = city?._id ? `api/cities/${city._id}`: `api/cities`
        fetch(createUrl(link), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(city),
        })
        .then((res) => {
            if(city?._id) setCityDto(undefined)
            loadCities()
            console.log(res.status)
        })   
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Miestas</th>
                    <th>Gyventojų skaičius</th>
                    <th>Veiksmai</th>
                </tr>
            </thead>
            <tbody>
                {cities.map((city, key) => (
                    <tr key={key}>
                        <td>{city.name}</td>
                        <td>{city.population}</td>
                        <td>
                            <ButtonGroup>
                                <Button variant="primary" onClick={() => handleFillForm(city)}>Keisti</Button>
                                <Button variant="danger"  onClick={() => handleDeleteFromList(city)}>Šalinti</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}