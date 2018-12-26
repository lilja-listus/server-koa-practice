import routes from 'config/routes';
import * as Router from 'koa-router';
import { UserHandler } from './handler';


const router = new Router({ prefix: routes.USER });

router.get('/:id', async (ctx: Router.IRouterContext) => {
    ctx.status = 200;

    const userId = ctx.params.id;

    const user = await new UserHandler().getById(userId);
    // get userId

    // call getUserById controller
    ctx.body = user;

})

export default router; 