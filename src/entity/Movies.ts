import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity("movies")
export class Movie extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: string;

    @Field()
    @Column({
        length: 150
    })
    title: string;

    @Field()
    @Column()
    runtime: number;

    @Field()
    @Column()
    format: string;

    @Field()
    @Column('text')
    plot: string;

    @Field()
    @Column()
    releaseYear: number;

    @Field()
    @Column()
    releaseMonth: number;

    @Field()
    @Column()
    releaseDate: number

}