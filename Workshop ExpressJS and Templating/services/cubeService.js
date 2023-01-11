const { calculateobjectSice } = require('bson');
const cube = require('../models/cube');

const createCube = async (cube, creator) => {
    const { name, description, imageUrl, difficulty, accessories } = cube;
    return await cube.create({ name, description, imageUrl, difficulty, accessories, creator });

};

const getAllCubes = async () => {
    return await cube.find({}).lean();

};

const getOneCube = async (_id) => {
    return await cube.findById(_id).populate('accessories').lean();

};

const search = async (text, from, to) => {
    let cubes = await getAllCubes();
    if (text) {
        cubes = cubes.filter(c => c.name.toLowerCase() == text.toLowerCase());

    }
    if (from) {
        cubes = cubes.filter((cube) => cube.difficulty >= from);

    }
    if (to) {
        cubes = cubes.filter((cube) => cube.difficulty <= to);

    }
    return cubes;

};

const editCube = async (id, body) => {
    let { name, description, imageUrl, difficultyLevel } = body;
    return cube.findByIdAndupdate(id, { name, description, imageUrl, 'difficulty': difficultyLevel });

};

const deleteCube = (id) => {
    cube.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
        }
    })
};

module.exports = {
    deleteCube,
    editCube,
    search,
    createCube,
    getAllCubes,
    getOneCube,

};