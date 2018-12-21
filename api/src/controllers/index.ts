import * as  Koa from 'koa';
import healthCheck from './health-check';
import user from './user';


export function registerRoutes(app: Koa) {
    app.use(healthCheck.routes());
    app.use(user.routes());
}