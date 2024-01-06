import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { networkId: string } },
) {}
