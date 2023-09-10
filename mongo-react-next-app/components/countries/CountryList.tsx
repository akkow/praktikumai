import { Button, ButtonGroup, Table } from "react-bootstrap";
import { createUrl } from "../../utils/url";
import { CountryDto } from "../../dto/country.dto";

type IProps = { 
    countries: CountryDto[]
    setCountryDto: (c: CountryDto) => void
    countryDto?: CountryDto
    loadCountries: () => void
}

export function CountryList(props: IProps) {

    const { countries, setCountryDto, countryDto, loadCountries } = props

    // Change button
    const handleFillForm = (country: CountryDto) => {
        setCountryDto(country)
    }

    // Delete button
    const handleDeleteFromList = (country: CountryDto) => {
        console.log(country)

        const link = country?._id ? `api/countries/${country._id}`: `api/countries`
        fetch(createUrl(link), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(country),
        })
        .then((res) => {
            if(country?._id) setCountryDto(undefined)
            loadCountries()
            console.log(res.status)
        })   
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Valstybe</th>
                    <th>Sostine</th>
                    <th>Plotas</th>
                    <th>Prezidentas</th>
                    <th>Kalba</th>
                    <th>Veiksmai</th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country, key) => (
                    <tr key={key}>
                        <td>{country.name}</td>
                        <td>{country.capital}</td>
                        <td>{country.area}</td>
                        <td>{country.president}</td>
                        <td>{country.language}</td>
                        <td>
                            <ButtonGroup>
                                <Button variant="primary" onClick={() => handleFillForm(country)}>Keisti</Button>
                                <Button variant="danger"  onClick={() => handleDeleteFromList(country)}>Šalinti</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}