
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
        },
        favoriteColor: {
            type: String,
            required: true,
            trim: true,
        },
        birthday: {
            type: String,
            required: true,
            match: [/^\d{4}-\d{2}-\d{2}$/, 'Birthday must use YYYY-MM-DD format'],
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Contact', contactSchema, 'contacts');