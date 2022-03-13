const { listUserLocations } = require('logic')

module.exports = (req, res) => {
    try {
        const { params: { userId } } = req

        listUserLocations(userId)
            .then(locations => res.json(locations))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}