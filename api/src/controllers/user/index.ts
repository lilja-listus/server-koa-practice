import routes from 'config/routes';
import * as Router from 'koa-router';
import { UserHandler } from './handler';


const router = new Router({ prefix: routes.USER });

router.get('/:id', async (ctx: Router.IRouterContext) => {
    ctx.status = 200;

    const userId = ctx.params.id;

    // call getUserById controller
    const user = await new UserHandler().getById(userId);

    ctx.body = user;

})

export default router; 