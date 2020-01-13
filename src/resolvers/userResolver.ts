import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware } from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { User } from '../entity/User';
import { ServerContext } from '../interface/ServerContext';
import { createRefreshToken, createAccessToken } from '../helpers/auth';
import { isAuth } from '../middlewares/isAuth';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi';
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() { payload }: ServerContext
    ) {
        console.log(payload)
        return `${payload.userId}`;
    }

    @Query(() => [User])
    getUsers() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: ServerContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email }})

        if (!user) {
            throw new Error('user not found')
        }

        const validUser = await compare(password, user.password);

        if (!validUser) {
            throw new Error('incorrect password')
        }

        res.cookie(
            'hii',
            createRefreshToken(user),
            { httpOnly: true }
        )

        return {
            accessToken: createAccessToken(user)
        }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const hashPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashPassword
            })
        } catch (err) {
            console.log(err);
            return false;
        }
        
        return true;
    } 
}