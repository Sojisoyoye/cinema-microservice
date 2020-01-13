import "reflect-metadata";
import express from 'express';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';
import { createConnection } from "typeorm";
import { MovieResolver } from "./resolvers/movieResolver";
import cookieParser from 'cookie-parser';
import { verify } from "jsonwebtoken";

(async () => {
    const app = express();

    app.use(cookieParser());
    app.get('/', (req, res) => {
        res.send('hello world');
    });

    app.post('/refresh_token', (req, res) => {
        const token = req.cookies.hii;

        if (!token) {
            return res.send({ ok: false, accessToken: ''});
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
        } catch (err) {
            console.log(err);
        }
    })

    await createConnection();

    const apolloServer = new ApolloServer({
       schema: await buildSchema({
           resolvers: [UserResolver, MovieResolver]
       }),
       context: ({req, res}) => ({req, res})
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server listening on port 4000');
    });
})();
 


