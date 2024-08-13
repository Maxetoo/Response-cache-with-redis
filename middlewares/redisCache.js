const redis = require('redis');
const users = require('../data/data');
const { json } = require('express');
const redisClient = redis.createClient();


redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});


(async() => {
    await redisClient.connect();
})();


const redisCache = (TTL) => {
    return async(req, res, next) => {
        const key = req.originalUrl

        if (req.method !== 'GET') {
            console.error("Must be a get request");
            return next()
        }
        try {
            const cachedResponse = await redisClient.get(key);

            if (cachedResponse) {
                console.log("Cache hit: ", key);

                return res.json(JSON.parse(cachedResponse))
            } else {

                console.log("Cache miss: ", key);

                res.originalJson = res.json
                res.json = body => {
                    redisClient.setEx(key, TTL, JSON.stringify(body))
                    return res.originalJson(body)
                }
            }

            next()

        } catch (error) {
            console.error(err);
            next()
        }

    }
}


module.exports = redisCache