import { Resolver, Query, Mutation, Arg, ObjectType } from 'type-graphql';
import { Movie } from '../entity/Movies';

@Resolver()
export class MovieResolver {
    @Query(() => String)
    Movies() {
        return 'new movie';
    }

    @Query(() => [Movie])
    async getAllMovies() {
        try {
            const movies = await Movie.find();

            return movies;
        } catch (err) {
            console.log(err);
        }
    }

    @Query(() => Movie)
    async getMovieById(
        @Arg('id') id: string
    ) {
        try {
            const movie = await Movie.findOne({ where: { id } });

            if (!movie) {
                throw new Error ('Movie with this id not found');
            }

            return movie;
        } catch (err) {
            console.log(err);
        }
    }


    // @Mutation(() => Boolean)
    // async register(
    //     @Arg('email') email: string,
    //     @Arg('password') password: string
    // ) {
    //     const hashPassword = await hash(password, 12);

    //     try {
    //         await User.insert({
    //             email,
    //             password: hashPassword
    //         })
    //     } catch (err) {
    //         console.log(err);
    //         return false;
    //     }
        
    //     return true;
    // } 
}