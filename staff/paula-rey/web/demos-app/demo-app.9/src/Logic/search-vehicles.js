import { validateQuery } from './helpers/validators'

function searchVehicles(query) {
    return fetch(`https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=${query}`)
        .then(res => res.json())
}

export default searchVehicles