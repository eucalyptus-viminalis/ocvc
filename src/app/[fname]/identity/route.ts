import { Frame, getFrameHtml } from "frames.js";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { fname: string } }
) {
    const fname = params.fname;
    return new Response(fname)
}
