import { validateToken, validateString } from './helpers/validators'

function toggleFavVehicle(token, vehicleId) {
    validateToken(token)
    validateString(vehicleId, 'id')

    return fetch('https://b00tc4mp.herokuapp.com/api/v2/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 200) {
                return res.json()
                    .then(user => {
                        const { favs = [] } = user

                        const index = favs.indexOf(vehicleId)

                        if (index === -1)
                            favs.push(vehicleId)
                        else
                            favs.splice(index, 1)

                        return fetch('https://b00tc4mp.herokuapp.com/api/v2/users', {
                            method: 'PATCH',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ favs })
                        })
                            .then(res => {
                                const { status } = res

                                if (status === 204) {
                                    return
                                } else if (status >= 400 && status < 500) {
                                    return res.json()
                                        .then(payload => {
                                            const { error } = payload

                                            throw new Error(error)
                                        })
                                } else if (status >= 500) {
                                    throw new Error('server error')
                                } else {
                                    throw new Error('unknown error')
                                }
                            })
                    })
            } else if (status >= 400 && status < 500) {
                return res.json()
                    .then(payload => {
                        const { error } = payload

                        throw new Error(error)
                    })
            } else if (status >= 500) {
                throw new Error('server error')
            } else {
                throw new Error('unknown error')
            }
        })
}

export default toggleFavVehicle


// TODO validate token and id
// TODO call api to retrieve user favs
// TODO update favs array (if fav was already there, remove it, if not, add it)
// TODO call api to update user favs