const Accessory = require('../models/accessory');
const Cube = require('../models/cube');

const createAccessory = async (accessory) => {
    return await Accessory.create(accessory);

};

const getAllAccessories = async () => {
    return await Accessory.find({}).lean();

};

const attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
    return cube.save();

};

const getAllWithout = async (cubeAccessoriesId) => {
    return Accessory.find().where('_id').nin(cubeAccessoriesId).lean();

};

module.exports = {
    getAllWithout,
    attachAccessory,
    createAccessory,
    getAllAccessories
};