const dotenv = require('dotenv')

const env = dotenv.config()
if (env.error) {
    console.error('specify parameters in .env file')
    process.exit(1)
}

const config = {}

config.threadpoolSize = parseInt(process.env.UV_THREADPOOL_SIZE)
config.dbSettings = {
    user: env.parsed.DB_USERNAME,
    password: env.parsed.DB_PASSWORD,
    connectionString: env.parsed.DB_URL,
    poolIncrement: config.threadpoolSize ? 0 : 1,
    poolMin: config.threadpoolSize || 0,
    poolMax: config.threadpoolSize || 4,
}
config.port = process.env.PORT || 5000
config.jwtSecret = env.parsed.TOKEN_SECRET

module.exports = config
