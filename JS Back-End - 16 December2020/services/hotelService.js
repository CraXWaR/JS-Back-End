const Hotel = require("../models/Hotel");

async function getAll() {
    return Hotel.find({}).lean();
}

async function getById(id) {
    return Hotel.findById(id).lean();
}

async function create(hotel) {
    return await Hotel.create(hotel);
}

async function update(id, hotel) {
    const exist = await Hotel.findById(id);

    exist.name = hotel.name;
    exist.city = hotel.city;
    exist.imageUrl = hotel.imageUrl;
    exist.rooms = hotel.rooms;

    await exist.save();
}

async function deleteById(id) {
    await Hotel.findByIdAndRemove(id);
}

async function bookRoom(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);

    if (hotel.bookings.includes(userId)) {
        throw new Error('Cannot book same hotel twice')
    }

    hotel.bookings.push(userId);
    await hotel.save();
}

async function getByUserBooking(userId) {
    return (await Hotel.find({ bookings: userId }).lean()).map(h => h.name);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom,
    getByUserBooking
};