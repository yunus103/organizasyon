import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Sanity webhook payload from standard setup
export async function POST(req: Request) {
  try {
    const signature = req.headers.get("sanity-webhook-signature");
    if (!signature) {
      return NextResponse.json(
        { message: "No signature provided" },
        { status: 401 },
      );
    }

    const { isValidSignature, SIGNATURE_HEADER_NAME } =
      await import("@sanity/webhook");
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      console.error(
        "SANITY_REVALIDATE_SECRET is not set in environment variables",
      );
      return NextResponse.json(
        { message: "Server misconfiguration: missing secret" },
        { status: 500 },
      );
    }

    const body = await req.text();

    // Verify signature
    if (!isValidSignature(body, signature, secret)) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    const payload = JSON.parse(body);
    const { _type, slug } = payload;

    console.log(`[Sanity Webhook] Revalidating type: ${_type}`);

    // Revalidate based on tags
    // For general collection updates
    if (_type) {
      revalidateTag(_type);
      console.log(`Revalidated tag: ${_type}`);
    }

    // For specific document updates based on slug
    if (_type && slug?.current) {
      const itemTag = `${_type}:${slug.current}`;
      revalidateTag(itemTag);
      console.log(`Revalidated tag: ${itemTag}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    console.error("Revalidation error:", err.message);
    return NextResponse.json(
      { message: "Error revalidating", error: err.message },
      { status: 500 },
    );
  }
}
