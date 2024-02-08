import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});



module.exports =  mongoose.models.Transactions || mongoose.model('Transactions', transactionSchema);