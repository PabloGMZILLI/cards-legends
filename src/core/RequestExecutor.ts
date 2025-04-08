import { NextRequest, NextResponse } from 'next/server';

export type RequestHandler = (req: NextRequest) => Promise<Response | NextResponse | null>;
export type DecoratorFn = (req: NextRequest) => Promise<Response | NextResponse | null>;

export class RequestExecutor {
  private decorators: DecoratorFn[] = [];
  private handlers: RequestHandler[] = [];

  use(decorator: DecoratorFn) {
    this.decorators.push(decorator);
    return this;
  }

  handle(handler: RequestHandler) {
    this.handlers.push(handler);
    return this;
  }

  async execute(req: NextRequest): Promise<Response | NextResponse> {
    for (const decorator of this.decorators) {
      const result = await decorator(req);
      if (result) return result; // interrompe se decorador bloquear
    }

    let finalResponse: Response | NextResponse = NextResponse.json({ message: 'No handler executed' }, { status: 500 });

    for (const handler of this.handlers) {
      const result = await handler(req);
      if (result) {
        finalResponse = result;
      }
    }

    return finalResponse;
  }
}
