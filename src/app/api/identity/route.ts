import { NextRequest, NextResponse } from "next/server";
import { getIdentityData } from "../../generate/identity/data";

export async function GET(req:NextRequest) {
    const fid = req.nextUrl.searchParams.get('fid')!
    const data = await getIdentityData(+fid)
    return NextResponse.json(data)
}