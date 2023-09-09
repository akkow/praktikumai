import { Button, ButtonGroup, Table } from "react-bootstrap";
import { CityDto } from "../../dto/city.dto";
import { createUrl } from "../../utils/url";
import { useEffect, useState } from "react";

type IProps = { cities: CityDto[]; setCityDto: (c: CityDto) => void; cityDto: CityDto }

export function CityList(props: IProps) {

    const { cities, setCityDto, cityDto } = props

    // Change button
    const handleFillForm = (city: CityDto) => {
        setCityDto(city)
    }

    // Delete button state hook
    const [cityData, setCityData] = useState<CityDto>({} as CityDto)
    useEffect(() => {
        if (cityDto) setCityData(cityDto)
    }, [cityDto])
    
    // Delete button
    const handleDeleteFromList =  async (city: CityDto) => {

        const link = `api/cities/${cityData?._id}`
        await fetch(createUrl(link), {
            method: "DELETE"
        })
        .catch((e) => {
            console.log(e)
        })
        setCityData({ ...city })
        console.log(city)
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