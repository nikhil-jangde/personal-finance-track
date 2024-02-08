import { NextResponse } from "next/server";
import connectDB from "../../../../libs/mongodb";
import Transactions from "../../../../models/transaction"
import FinancialOverview from "../../../../models/overview";


export async function GET(request) {
    try {
        await connectDB();
        const transactions = await Transactions.find({}); // Fetch all transactions
        return NextResponse.json({ success: true, data: transactions }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { description, category, date, amount, type } = await request.json();
        await connectDB();

        // Create the transaction
        await Transactions.create({ description, category, date, amount, type });

        // Find or create the financial overview
        let financialOverview = await FinancialOverview.findOne();
        if (!financialOverview) {
            // Create a new financial overview document with default values
            financialOverview = await FinancialOverview.create({
                totalBalance: 0,
                spendings: [],
                income: []
            });
        }

        // Update the financial overview based on the transaction type
        if (type === 'credit') {
            // Update income
            financialOverview.income.push({ amount, date: new Date(date) }); // Use request date
            financialOverview.totalBalance += amount;
        } else if (type === 'debit') {
            // Update spendings
            financialOverview.spendings.push({ amount, date: new Date(date) }); // Use request date
            financialOverview.totalBalance -= amount;
        }
        await financialOverview.save();

        return NextResponse.json({ message: "Transaction added" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
    }
}
