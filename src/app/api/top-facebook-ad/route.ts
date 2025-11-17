// src/app/api/top-facebook-ad/route.ts
import { NextResponse } from "next/server";

const GRAPH_VERSION = process.env.FB_GRAPH_VERSION || "v21.0";

export async function GET() {
  const token = process.env.FB_SYSTEM_TOKEN;
  const adAccountId = process.env.FB_AD_ACCOUNT_ID;

  // safety
  if (!token || !adAccountId) {
    return NextResponse.json(
      {
        ok: false,
        reason: "FB token or ad account not configured",
      },
      { status: 500 }
    );
  }

  try {
    // 1) get top ad by impressions (last 30 days)
    const insightsUrl =
      `https://graph.facebook.com/${GRAPH_VERSION}/act_${adAccountId}/insights` +
      `?level=ad&fields=ad_id,ad_name,impressions,reach,clicks&date_preset=last_30d&sort=impressions_desc&limit=1&access_token=${token}`;

    const insightsRes = await fetch(insightsUrl, { cache: "no-store" });
    const insightsJson = await insightsRes.json();

    const top = insightsJson?.data?.[0];
    if (!top?.ad_id) {
      return NextResponse.json(
        {
          ok: false,
          reason:
            "No ads returned from Facebook (check permissions / ads_read)",
        },
        { status: 200 }
      );
    }

    // 2) get the creative for that ad
    const adId = top.ad_id;
    const creativeUrl =
      `https://graph.facebook.com/${GRAPH_VERSION}/${adId}` +
      `?fields=creative{object_story_id,thumbnail_url,image_url,title,actor_id}&access_token=${token}`;

    const adRes = await fetch(creativeUrl, { cache: "no-store" });
    const adJson = await adRes.json();

    return NextResponse.json(
      {
        ok: true,
        ad: top,
        creative: adJson?.creative ?? null,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      {
        ok: false,
        reason: message,
      },
      { status: 500 }
    );
  }

}
