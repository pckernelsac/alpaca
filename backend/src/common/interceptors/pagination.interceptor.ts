import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;

    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const perPage = Math.min(200, Math.max(1, parseInt(query.perPage, 10) || 25));
    const sort = query.sort || 'createdAt';
    const order = query.order?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    request.pagination = { page, perPage, sort, order };

    return next.handle().pipe(
      map((data) => {
        if (data && data.rows && data.count !== undefined) {
          const totalPages = Math.ceil(data.count / perPage);
          return {
            data: data.rows,
            meta: {
              page,
              perPage,
              total: data.count,
              totalPages,
            },
          };
        }
        return data;
      }),
    );
  }
}
