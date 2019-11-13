import { prop, Typegoose } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Post extends Typegoose {
    @prop({ required: false })
    _id?: Types.ObjectId

    @prop({ required: true })
    uri!: string;

    @prop({ required: true })
    metas!: Meta[];

    @prop({ required: true })
    title!: string;

    @prop({ required: true })
    markdown!: string;

    @prop({ required: true })
    description!: string;
}

export interface IPost {
    _id: Types.ObjectId;
    uri: string;
    metas: Meta[];
    title: string;
    markdown: string;
    description: string;
}

export interface Meta {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

const PostModel = new Post().getModelForClass(Post);

export { PostModel };
