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

  // Ensure targetUrl has protocol or resolve relative routes
  if (targetUrl.startsWith("/")) {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "cvverse.recolabs.in";
    const proto = req.headers.get("x-forwarded-proto") || "https";
    targetUrl = `${proto}://${host}${targetUrl}`;
  } else if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
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

      // Strip Content-Security-Policy & X-Frame-Options meta tags & canonical link
      html = html.replace(/<meta[^>]*http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, "");
      html = html.replace(/<meta[^>]*http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, "");
      html = html.replace(/<link[^>]*rel=["']?canonical["']?[^>]*>/gi, "");
      html = html.replace(/<base[^>]*>/gi, "");

      const escapedOrigin = origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // 1. Rewrite assets: <link href="/..."> and <script/img/video src="/..."> to absolute origin URLs
      html = html.replace(/(<link\s+[^>]*href=["'])\/(?!\/)([^"']*)(["'])/gi, (m, p1, p2, p3) => {
        return p1 + origin + "/" + p2 + p3;
      });
      html = html.replace(/(src=["'])\/(?!\/)([^"']*)(["'])/gi, (m, p1, p2, p3) => {
        return p1 + origin + "/" + p2 + p3;
      });
      html = html.replace(/(action=["'])\/(?!\/)([^"']*)(["'])/gi, (m, p1, p2, p3) => {
        return p1 + origin + "/" + p2 + p3;
      });

      // 2. Rewrite anchors: internal relative hrefs to proxy URLs, preserving in-page hashes
      html = html.replace(/(<a\s+[^>]*href=["'])\/(?!\/)([^"']*)(["'])/gi, (m, p1, p2, p3) => {
        if (p2.startsWith("#")) return p1 + p2 + p3;
        return p1 + "/api/proxy?url=" + encodeURIComponent(origin + "/" + p2) + p3;
      });

      // 3. Rewrite anchors: internal absolute hrefs pointing to origin to proxy URLs
      html = html.replace(new RegExp("(<a\\s+[^>]*href=[\"'])" + escapedOrigin + "([^\"']*)([\"'])", "gi"), (m, p1, p2, p3) => {
        if (p2.startsWith("/#") || p2.startsWith("#")) return p1 + p2.replace(/^\//, "") + p3;
        return p1 + "/api/proxy?url=" + encodeURIComponent(origin + p2) + p3;
      });

      // Robust client-side protection script:
      // 1. Sets no-referrer so external media/CDN doesn't reject with ERR_EMPTY_RESPONSE
      // 2. Suppresses client errors, unhandled rejections, and frame-busting
      // 3. Guards audio & sound effects from breaking on blocked requests
      // 4. Traps location.replace & location.assign so Next.js hydration never navigates out of the proxy
      // 5. Intercepts link clicks so same-domain navigation stays proxied, in-page anchors scroll,
      //    and external links open safely in a new tab without frame blocks.
      const safetyHead = `
        <meta name="referrer" content="no-referrer" />
        <script>
          (function() {
            window.onerror = function() { return true; };
            window.onunhandledrejection = function(e) { if(e && e.preventDefault) e.preventDefault(); return true; };

            // Trap location.replace and location.assign to keep Next.js router inside proxy
            try {
              var targetOrigin = "${origin}";
              var origReplace = window.location.replace;
              if (origReplace) {
                window.location.replace = function(url) {
                  try {
                    var u = new URL(url, targetOrigin);
                    if (u.origin === targetOrigin) {
                      return origReplace.call(window.location, window.location.origin + '/api/proxy?url=' + encodeURIComponent(u.href));
                    }
                  } catch(e) {}
                  return origReplace.call(window.location, url);
                };
              }
              var origAssign = window.location.assign;
              if (origAssign) {
                window.location.assign = function(url) {
                  try {
                    var u = new URL(url, targetOrigin);
                    if (u.origin === targetOrigin) {
                      return origAssign.call(window.location, window.location.origin + '/api/proxy?url=' + encodeURIComponent(u.href));
                    }
                  } catch(e) {}
                  return origAssign.call(window.location, url);
                };
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

            // Intercept internal & external link clicks
            document.addEventListener('click', function(e) {
              var el = e.target;
              while (el && el.tagName !== 'A') {
                el = el.parentElement;
              }
              if (!el) return;

              var rawHref = el.getAttribute('href') || '';
              if (!rawHref || rawHref.startsWith('javascript:')) return;

              // Smooth scroll for hash links
              if (rawHref.startsWith('#')) {
                var targetId = rawHref.slice(1);
                var elem = document.getElementById(targetId) || document.querySelector('[name="' + targetId + '"]');
                if (elem) {
                  e.preventDefault();
                  elem.scrollIntoView({ behavior: 'smooth' });
                }
                return;
              }

              try {
                var targetOrigin = "${origin}";
                var resolved = new URL(el.href, window.location.href);

                if (resolved.origin === targetOrigin) {
                  // Internal navigation on target domain: keep within proxy
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = window.location.origin + '/api/proxy?url=' + encodeURIComponent(resolved.href);
                } else if (resolved.pathname.startsWith('/api/proxy')) {
                  // Already a proxy link: allow it to load within this frame
                  return;
                } else if (!resolved.protocol.startsWith('http')) {
                  return;
                } else {
                  // External link (e.g. GitHub, Twitter): open safely in new tab
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(resolved.href, '_blank', 'noopener,noreferrer');
                }
              } catch(err) {}
            }, true);

            // Intercept fetch to proxy same-origin API / Next data requests
            try {
              var origFetch = window.fetch;
              if (origFetch) {
                window.fetch = function(input, init) {
                  try {
                    if (typeof input === 'string') {
                      if (input.startsWith('/') && !input.startsWith('/api/proxy')) {
                        input = '/api/proxy?url=' + encodeURIComponent('${origin}' + input);
                      } else if (input.startsWith('${origin}')) {
                        input = '/api/proxy?url=' + encodeURIComponent(input);
                      }
                    }
                  } catch(e) {}
                  return origFetch.call(this, input, init);
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
          "Content-Security-Policy": "frame-ancestors *",
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
