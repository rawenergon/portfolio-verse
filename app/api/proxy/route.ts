import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

async function handleProxy(req: NextRequest) {
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

    const requestHeaders: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Referer": `${origin}/`,
      "Origin": origin,
      "Accept": req.headers.get("accept") || "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    };

    let body: BodyInit | undefined = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      try {
        body = await req.arrayBuffer();
      } catch {
        body = undefined;
      }
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: requestHeaders,
      body,
      redirect: "follow",
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      let html = await response.text();

      // Strip Content-Security-Policy & X-Frame-Options meta tags
      html = html.replace(/<meta[^>]*http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, "");
      html = html.replace(/<meta[^>]*http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, "");

      // Robust client-side protection script:
      // 1. Sets no-referrer so external media/CDN doesn't reject with ERR_EMPTY_RESPONSE
      // 2. Suppresses client errors, unhandled rejections, and frame-busting
      // 3. Guards audio & sound effects from breaking on blocked requests
      const safetyHead = `
        <meta name="referrer" content="no-referrer" />
        <base href="${origin}/" />
        <script>
          (function() {
            window.onerror = function() { return true; };
            window.onunhandledrejection = function(e) { if(e && e.preventDefault) e.preventDefault(); return true; };
            try {
              if (window.top !== window.self) {
                // Prevent iframe busting
                Object.defineProperty(window, 'top', { get: function() { return window.self; } });
              }
            } catch(e) {}
            try {
              var origAudio = window.Audio;
              if (origAudio) {
                window.Audio = function() {
                  var a = new (Function.prototype.bind.apply(origAudio, [null].concat(Array.prototype.slice.call(arguments))))();
                  a.addEventListener('error', function(e) { if(e.stopImmediatePropagation) e.stopImmediatePropagation(); });
                  var origPlay = a.play;
                  a.play = function() {
                    try {
                      var p = origPlay.apply(a, arguments);
                      if (p && p.catch) return p.catch(function() {});
                      return Promise.resolve();
                    } catch(err) {
                      return Promise.resolve();
                    }
                  };
                  return a;
                };
              }
            } catch(e) {}
          })();
        </script>
      `;

      if (html.includes("<head>")) {
        html = html.replace("<head>", `<head>${safetyHead}`);
      } else if (html.includes("<head ")) {
        html = html.replace(/<head[^>]*>/, `$&${safetyHead}`);
      } else {
        html = `${safetyHead}${html}`;
      }

      return new NextResponse(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "X-Frame-Options": "ALLOWALL",
          ...CORS_HEADERS,
        },
      });
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        ...CORS_HEADERS,
      },
    });
  } catch (err: any) {
    return new NextResponse(
      `<div style="color:white;background:#09090b;font-family:sans-serif;padding:32px;text-align:center;">
        <h3 style="font-size:18px;margin-bottom:8px;">Unable to load preview for ${targetUrl}</h3>
        <p style="color:#a1a1aa;font-size:13px;margin-bottom:16px;">${err?.message || "Connection timeout"}</p>
        <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#ff6a00;color:white;padding:8px 16px;border-radius:8px;text-decoration:none;font-weight:600;font-size:12px;">
          Open external demo directly ↗
        </a>
      </div>`,
      {
        status: 200,
        headers: { 
          "Content-Type": "text/html; charset=utf-8",
          ...CORS_HEADERS
        }
      }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleProxy(req);
}

export async function POST(req: NextRequest) {
  return handleProxy(req);
}

export async function PUT(req: NextRequest) {
  return handleProxy(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxy(req);
}
