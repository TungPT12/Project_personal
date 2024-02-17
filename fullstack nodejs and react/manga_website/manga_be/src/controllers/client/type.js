const Type = require('../../models/Type');

exports.getTypes = async (req, res) => {
    const types = await Type.find();
    return res.json(types)
}