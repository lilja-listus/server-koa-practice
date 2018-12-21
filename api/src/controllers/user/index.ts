import routes from 'config/routes';
import * as Router from 'koa-router';


const router = new Router({ prefix: routes.USER });

router.get('/:id', async (ctx: Router.IRouterContext) => {
    ctx.status = 200;
})

export default router; 