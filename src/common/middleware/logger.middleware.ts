// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {
//         console.log(`Incoming request: ${req.method} ${req.url} from ${req.hostname}`);
//         next();
//     }
// }

//Use functional middleware if there are no dependencies

import { NotImplementedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(
        `Incoming request: ${req.method} ${req.url} from ${req.hostname}`,
    );
    next();
}
