const db = require('../dataBase.json');
const fs = require('fs');
const saveCat = (cat) => {
    db.cats.push(cat);
    const result = JSON.stringify(db, null, 2);

    fs.writeFileSync('./dataBase.json', result, {
        encoding: 'utf8'
    });
}

const saveBreed = (breed) => {
    db.breeds.push(breed);
    const result = JSON.stringify(db, null, 2);

    fs.writeFileSync('./dataBase.json', result, {
        encoding: 'utf8'
    });
}

const storageService = {
    saveCat,
    saveBreed
}

module.exports = storageService