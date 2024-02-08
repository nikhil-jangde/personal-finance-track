import mongoose from "mongoose";
mongoose.Promise = global.Promise;


const FinancialOverviewSchema = new mongoose.Schema({
    totalBalance: {
        type: Number,
        default: 0
    },
    spendings: [{
        amount: Number,
        date: Date  // Change timestamp to date
    }],
    income: [{
        amount: Number,
        date: Date  // Change timestamp to date
    }]
});

export default mongoose.models.FinancialOverview || mongoose.model('FinancialOverview', FinancialOverviewSchema);
