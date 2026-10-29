declare module 'next/server' {
  export class NextResponse extends Response {
    static json(body: unknown, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static next(): NextResponse;
    cookies: {
      get(name: string): { value: string } | undefined;
      set(name: string, value: string): void;
      delete(name: string): void;
    };
  }

  export interface NextRequest extends Request {
    nextUrl: URL;
    cookies: {
      get(name: string): { value: string } | undefined;
      set(name: string, value: string): void;
      delete(name: string): void;
    };
  }
}
