// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const pixelId = process.env.META_PIXEL_ID!;
//     const accessToken = process.env.META_ACCESS_TOKEN!;

//     const hash = (value: string) =>
//       crypto
//         .createHash("sha256")
//         .update(value.trim().toLowerCase())
//         .digest("hex");

//     const response = await fetch(
//       `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           data: [
//             {
//               event_name: body.event_name,
//               event_time: Math.floor(Date.now() / 1000),
//               event_id: body.event_id,
//               action_source: "website",

//               event_source_url: body.url,

//               custom_data: {
//                 value: body.value,
//                 currency: "BDT",
//               },

//               user_data: {
//                 em: body.email ? hash(body.email) : undefined,
//                 client_user_agent: body.userAgent,
//               },
//             },
//           ],
//         }),
//       },
//     );

//     const result = await response.json();

//     return Response.json(result);
//   } catch (error) {
//     return Response.json(
//       { error: "Meta API error", details: error },
//       { status: 500 },
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN!;

function hash(value?: string) {
  if (!value) return undefined;

  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      event_name,
      event_id,
      value,
      email,
      phone,
      name,
      city,
      url,
      userAgent,
      contents,
    } = body;

    // Split name
    let firstName = "";
    let lastName = "";

    if (name) {
      const parts = name.split(" ");
      firstName = parts[0] || "";
      lastName = parts.slice(1).join(" ") || "";
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "";

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,

          action_source: "website",
          event_source_url: url,

          user_data: {
            em: hash(email),
            ph: hash(phone),
            fn: hash(firstName),
            ln: hash(lastName),
            ct: hash(city),
            country: hash("bd"),
            client_ip_address: ip,
            client_user_agent: userAgent,
          },

          custom_data: {
            currency: "BDT",
            value,
            contents,
            content_type: "product",
          },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Meta CAPI Error:", error);
    return NextResponse.json({ error: "Meta API failed" }, { status: 500 });
  }
}
