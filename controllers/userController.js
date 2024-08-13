const users = require('../data/data')

const getUsers = async(req, res) => {
    try {
        await res.json({ users })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getUsers
}