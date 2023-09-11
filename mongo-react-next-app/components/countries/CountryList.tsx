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

    let i = 1;

    return (
        <div className="overflow-x-auto grid place-items-center h-auto my-7">
            <table className="table-md bg-gray-700 overflow-hidden rounded-xl">
                {/* head */}
                <thead className="border-2 border-gray-600 uppercase text-md text-white text-center">
                    <tr>
                        <th>#</th>
                        <th>Pavadinimas</th>
                        <th>Sostine</th>
                        <th>Plotas</th>
                        <th>Prezidentas</th>
                        <th>Kalba</th>
                        <th>Veiksmai</th>
                        </tr>
                </thead>
                <tbody className="border-2 border-gray-600 uppercase text-md text-white font-bold">
                    {/* row 1 */}
                    {countries.map((country, key) => (
                    <tr className="border-2 border-gray-600" key={key}>
                        <td className="text-center">{i++}</td>
                        <td className="text-center">{country.name}</td>
                        <td className="text-center">{country.capital}</td>
                        <td className="text-center">{country.area}</td>
                        <td className="text-center">{country.president}</td>
                        <td className="text-center">{country.language}</td>
                        <td>
                            <ButtonGroup>
                                <Button className="font-bold bg-blue-900 hover:bg-blue-600 border-none" onClick={() => handleFillForm(country)}>Keisti</Button>
                                <Button className="font-bold bg-red-500 hover:bg-red-900 border-none text-white" onClick={() => handleDeleteFromList(country)}>Šalinti</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                    ))}
                    {/* row 2 */}
                </tbody>
            </table>
        </div>
        /*
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
        */
    )
}