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

    let i = 1;

    return (
        <div className="overflow-x-auto grid place-items-center h-auto my-7">
            <table className="table-md bg-gray-700 overflow-hidden rounded-xl">
                {/* head */}
                <thead className="border-2 border-gray-600 uppercase text-md text-white text-center">
                    <tr>
                        <th>#</th>
                        <th>Pavadinimas</th>
                        <th>Gyventoju sk.</th>
                        <th>Veiksmai</th>
                        </tr>
                </thead>
                <tbody className="border-2 border-gray-600 uppercase text-md text-white font-bold">
                    {/* row 1 */}
                    {cities.map((city, key) => (
                    <tr className="border-2 border-gray-600" key={key}>
                        <td className="text-center">{i++}</td>
                        <td className="text-center">{city.name}</td>
                        <td className="text-center">{city.population}</td>
                        <td>
                            <ButtonGroup>
                                <Button className="font-bold bg-blue-900 hover:bg-blue-600 border-none" onClick={() => handleFillForm(city)}>Keisti</Button>
                                <Button className="font-bold bg-red-500 hover:bg-red-900 border-none text-white" onClick={() => handleDeleteFromList(city)}>Šalinti</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                    ))}
                    {/* row 2 */}
                </tbody>
            </table>
        </div>
    )
}