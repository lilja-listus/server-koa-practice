import * as Koa from 'koa';
import * as bodyParse from 'koa-body';
// import { incomingRequestLog, handleErrors, accessLog } from './middlewares';

import * as cors from '@koa/cors';
import { registerRoutes } from 'api/src/controllers';

const app = new Koa();

app.use(cors());

app.use(
    bodyParse()
);

// app.use(accessLog());
// app.use(incomingRequestLog);
// app.use(handleErrors());

registerRoutes(app);

export default app;