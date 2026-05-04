const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homes',
        required: true
    },

    checkInDate: {
        type: Date,
        required: true
    },

    checkOutDate: {
        type: Date,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },
    
    guestCount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }

}, 
{ timestamps: true });

module.exports =mongoose.model("Booking",bookingSchema);