import dbConfig from 'config/database';

const {
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize,
    logging,
    ssl
} = dbConfig;

const entities = ['database/models/*.ts'];
const migrations = ['database/migrations/**/*.ts'];
const cli = {
    migrationsDir: 'database/migrations'
};

export {
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize,
    logging,
    entities,
    migrations,
    cli,
    ssl
};