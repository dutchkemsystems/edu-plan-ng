/**
 * Next.js Server Shim
 * 
 * Provides runtime and type-safe replacements for `next/server` imports
 * in environments where Next.js is not installed (e.g., Vite SPA + Express backend).
 */

export class NextResponse extends Response {
  static json(data: any, init?: ResponseInit): Response {
    const headers = new Headers(init?.headers);
    if (!headers.has('content-type')) {
      headers.set('content-type', 'application/json');
    }
    return new Response(JSON.stringify(data), {
      ...init,
      headers,
    });
  }

  static redirect(url: string | URL, init?: number | ResponseInit): Response {
    const status = typeof init === 'number' ? init : init?.status || 307;
    const headers = new Headers(typeof init === 'object' ? init?.headers : undefined);
    headers.set('Location', url.toString());
    return new Response(null, {
      status,
      headers,
    });
  }

  static next(): Response {
    return new Response(null, {
      status: 200,
      headers: { 'x-middleware-next': '1' },
    });
  }
}

export type NextRequest = Request & {
  nextUrl: URL;
  cookies: {
    get: (name: string) => { name: string; value: string } | undefined;
    getAll: () => Array<{ name: string; value: string }>;
    set: (name: string, value: string) => void;
    delete: (name: string) => void;
  };
};
