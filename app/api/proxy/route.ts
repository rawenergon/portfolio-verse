import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  let targetUrl = searchParams.get("url");

  if (!targetUrl) {
    targetUrl = "https://ccidcop.in";
  }

  // Ensure targetUrl has protocol
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = `https://${targetUrl}`;
  }

  try {
    const parsed = new URL(targetUrl);
    const origin = parsed.origin;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 60 } // cache for 60 seconds
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      let html = await response.text();

      // Remove any meta CSP or frame blockers inside HTML
      html = html.replace(/<meta[^>]*http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, "");
      html = html.replace(/<meta[^>]*http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, "");

      // Inject base tag and error suppression script so client hydration doesn't fail
      const safetyScript = `<script>window.onerror = function() { return true; };</script>`;
      const baseTag = `<base href="${origin}/" />${safetyScript}`;
      if (html.includes("<head>")) {
        html = html.replace("<head>", `<head>${baseTag}`);
      } else if (html.includes("<head ")) {
        html = html.replace(/<head[^>]*>/, `$&${baseTag}`);
      } else {
        html = `${baseTag}${html}`;
      }

      return new NextResponse(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "X-Frame-Options": "ALLOWALL",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    return new NextResponse(
      `<div style="color:white;background:#09090b;font-family:sans-serif;padding:24px;text-align:center;">
        <h3>Unable to load live preview for ${targetUrl}</h3>
        <p style="color:#888;">${err?.message || "Connection timeout"}</p>
        <a href="${targetUrl}" target="_blank" style="color:#ff6a00;">Open external directly ↗</a>
      </div>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      }
    );
  }
}
