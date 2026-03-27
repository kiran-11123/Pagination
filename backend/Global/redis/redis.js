import redis from 'redis';
import logger from '../logger.js';


const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
    url : process.env.REDIS_URL
});

client.on('error', (err) => {
    logger.error({
        message : `Error connecting to Redis ${err}`
    })
});

logger.info({
    message : "Redis Client is Connected"
})