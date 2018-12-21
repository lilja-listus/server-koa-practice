import config from 'config/api';
import app from './app';

app.listen(config.port, config.host, () => {
    console.log(`The Koa-Server API has started on port ${config.port}.`);
});