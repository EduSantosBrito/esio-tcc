import { Typegoose, prop } from '@typegoose/typegoose';

class User extends Typegoose {
    @prop({ required: true })
    email!: string;

    @prop({ required: true })
    password!: string;
}

const UserModel = new User().getModelForClass(User);

export { UserModel, User };
