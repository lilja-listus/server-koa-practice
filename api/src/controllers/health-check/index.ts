import routes from 'config/routes';
import * as Router from 'koa-router';

const { version } = require('api/package.json');

const router = new Router({ prefix: routes.HEALTH_CHECK });

router.get('/', async (ctx: Router.IRouterContext) => {
    ctx.status = 200;
    ctx.body = `build ${version}`;
})

export default router; 