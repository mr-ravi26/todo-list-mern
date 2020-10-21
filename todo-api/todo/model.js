import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    subject: {
        type: String
    },
    parent: {
        type: String, ref: this
    },
    user: { type: String, ref: 'User' },
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    cr_date: {
        type: Date,
        default: Date.now()
    },
    cr_by: { type: String, ref: 'User' },
    mod_date: {
        type: Date,
        default: Date.now()
    },
    mod_by: { type: String, ref: 'User' }
})

Schema.pre('save', function (next) {
    next()
})


// Export the model
export default mongoose.model('ToDo', Schema);