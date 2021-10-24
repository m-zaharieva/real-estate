const mongoose = require('mongoose');

const estateSchema = new mongoose.Schema({
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
    availablePieces: {
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

const Estate = mongoose.model('Estate', estateSchema);

module.exports = Estate;