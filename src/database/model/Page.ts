import { prop, Typegoose } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Page extends Typegoose {
    @prop({ required: false })
    _id?: Types.ObjectId

    @prop({ required: true })
    name!: string;

    @prop({ required: true })
    uri!: string;

    @prop({ required: true })
    metas!: Meta[];

    @prop({ required: true })
    title!: string;

    @prop({ required: true })
    isBlog!: boolean;

    @prop({ required: true })
    isHomepage!: boolean;

    @prop({ required: true })
    markdown!: string;
}

export interface IPage {
    _id: Types.ObjectId;
    name: string;
    uri: string;
    metas: Meta[];
    title: string;
    isBlog: boolean;
    isHomepage: boolean;
    markdown: string;
}

export interface Meta {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

const PageModel = new Page().getModelForClass(Page);

export { PageModel };
