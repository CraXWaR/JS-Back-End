const fs = require('fs');
const name = './data.json';
const data = JSON.parse(fs.readFileSync(name));

async function getItems() {
    return new Promise((res, rej) => {
        fs.writeFile(name, JSON.stringify(data, null, 2), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        })
    });
}

function getAll(search, from, to) {
    from = Number(from) || Number.MIN_SAFE_INTEGER;
    to = Number(to) || Number.MAX_SAFE_INTEGER;
    search = search || "";

    const output = data
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || '')
        .filter(c => c.difficulty >= from && c.difficulty <= to);
    return output.length > 0 ? output : data;
}

function getById(id) {
    return data.find(i => i.id == id);

}

async function create(cubeData) {
    const cube = {
        id: getId(),
        name: cubeData.name,
        difficulty: Number(cubeData.difficulty),
        imgUrl: cubeData.imgUrl,
        description: cubeData.description,
    }
    data.push(cube);
    await getItems();
    return cube;
}

function getId() {
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
}

module.exports = {
    getAll,
    getById,
    create
}