const { validators: { validateId } } = require('commons')
const { models: { User, Location } } = require('data')

function listUserLocations(userId) {
    validateId(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Location.find({ user: userId }).lean()
                .then(locations => {
                    locations.forEach(location => {
                        location.id = location._id.toString()

                        delete location._id
                        delete location.user
                        delete location.__v

                        return location
                    })

                    return locations
                })
        })
}

module.exports = listUserLocations

