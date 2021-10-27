const mongoose = require('mongoose');

const estateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1850,
        max: 2021,
    },
    city: {
        type: String,
        required: true,
        minlength: 4,
    },
    homeImage: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid image url']
    },
    description: {
        type: String,
        required: true,
        maxlength: 60,
    },
    availablePieces: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
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
}, {timestamps: true});

const Estate = mongoose.model('Estate', estateSchema);

module.exports = Estate;