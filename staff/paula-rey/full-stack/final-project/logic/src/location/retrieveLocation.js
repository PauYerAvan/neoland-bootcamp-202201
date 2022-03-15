const { validators: { validateId } } = require('commons')
const { models: { Location, User } } = require('data')

function retrievelocation(userId, locationId) {
    validateId(userId, 'user id')
    validateId(locationId, 'location id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Location.findById(locationId).lean().populate('user')
        })
        .then(location => {
            if(!location) throw new Error(`location with id ${locationId} does not exist`)
            
            location.userId = location.user._id.toString()
            location.userName = location.user.name 
            
            delete location._id
            delete location.__v
            delete location.user
    
            return location
            
        })
}


module.exports = retrievelocation
