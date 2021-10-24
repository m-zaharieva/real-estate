const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    homeImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availablePeaces: {
        type: Number,
        required: true,
    },
    rented: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;