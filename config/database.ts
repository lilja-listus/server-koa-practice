const config: any = {
    database: "content_user",
    host: "localhost",
    logging: false,
    username: "content_user",
    password: "plaintextpassword",
    port: 5432,
    synchronize: false,
    type: 'postgres',
    entities: ['common/database/models/**/*.ts'],
    migrations: ['common/database/migrations/**/*.ts'],
    cli: {
        migrationsDir: 'common/database/migrations'
    }
};

export default config;