import config from 'config/database';
import {
    Connection,
    ConnectionOptions,
    createConnection,
    Repository
} from 'typeorm';

let connection: Connection | undefined;

config.entities = [`${__dirname}/models/**.ts`];

export default async function connect<TEntity>(
    model: any
): Promise<Repository<TEntity>> {
    if (!connection) {
        connection = await createConnection(config as ConnectionOptions);
    }

    return connection.getRepository<TEntity>(model)
};
