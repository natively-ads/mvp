import { type NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { networkId: string } },
) {}
