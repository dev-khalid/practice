import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, tap, throwError } from 'rxjs';

/**
 * This can be used to send logs to DD.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log(`Started Executing...`);
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`Execution time: ${Date.now() - now}ms`)),
      catchError((err, caught) => {
        console.log(`Execution time: ${Date.now() - now}ms`);
        // const error = new Error(err);
        return throwError(() => err);
      })
    );
    //NOTE: This handle() will call the route handler method.
    //NOTE: If we want to do something with the result then .pipe() comes into the picture.
  }
}
