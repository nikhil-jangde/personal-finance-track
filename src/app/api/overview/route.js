// pages/api/financial-overview.js
import { NextResponse } from "next/server";
import connectDB from "../../../../libs/mongodb";
import FinancialOverview from "../../../../models/overview"


export async function GET(request) {
    try {
        await connectDB();
        const overview = await FinancialOverview.find({}); // Fetch all transactions
        return NextResponse.json({ success: true, data: overview }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch Overview" }, { status: 500 });
    }
}