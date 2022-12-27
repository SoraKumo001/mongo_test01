import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { sign } from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import { NextApiResponse } from 'next';
import { createHash } from '../../libs/tools';
import cookie from 'cookie';

/**
 * TypeScript用型情報
 */
export interface IUser {
  identity: string;
  password: string;
  name: string;
}

/**
 * MongoDB用型情報
 */
const schema = new Schema<IUser>({
  identity: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true, default: '' },
});

/**
 * mongooseに型情報を設定
 */
export const userModel = model('User', schema, undefined, { overwriteModels: true });

/**
 * graphql-compose-mongooseでGraphQL用の機能を生成
 */
const User = composeWithMongoose(userModel, { fields: { remove: ['password'] } });

schemaComposer.Query.addFields({
  userById: User.getResolver('findById'),
});

/**
 * ログイン処理
 */
schemaComposer.Mutation.addFields({
  login: {
    name: 'login',
    args: {
      identity: 'String!',
      password: 'String!',
    },
    type: 'String',
    resolve: async (_, args, context) => {
      const password = createHash(args.password);
      const value = await userModel.findOne({ identity: args.identity, password });
      if (!value) return null;
      const secret = process.env.JWT_SECRET || '';
      const claims = { sub: value._id, identity: value.identity, name: value.name };
      const token = sign(claims, secret, { expiresIn: '7 days' });
      const res: NextApiResponse = context.res;
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        })
      );
      return token;
    },
  },
});

/**
 * ログアウト処理
 */
schemaComposer.Mutation.addFields({
  logout: {
    name: 'logout',
    type: 'String!',
    resolve: async (_, args, context) => {
      const res: NextApiResponse = context.res;
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 0,
          path: '/',
        })
      );
      return 'OK';
    },
  },
});

/**
 * 初期ユーザの追加
 */
userModel.count().then((count) => {
  if (count === 0) {
    userModel.insertMany([
      { identity: 'user1', password: createHash('a'), name: 'ユーザー1' },
      { identity: 'user2', password: createHash('b'), name: 'ユーザー2' },
    ]);
  }
});
