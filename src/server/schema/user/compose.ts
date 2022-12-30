import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { sign } from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import { NextApiResponse } from 'next';
import { createHash } from '../../libs/tools';
import cookie from 'cookie';
import { UserModel } from './model';

export const initUser = () => {
  /**
   * graphql-compose-mongooseでGraphQL用の機能を生成
   */
  composeWithMongoose(UserModel, { fields: { remove: ['password'] } });

  // schemaComposer.Query.addFields({
  //   userById: User.getResolver('findById'),
  // });

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
        const value = await UserModel.findOne({ identity: args.identity, password });
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
      resolve: async (_, _args, context) => {
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
  UserModel.count().then((count) => {
    if (count === 0) {
      UserModel.insertMany([
        { identity: 'user1', password: createHash('a'), name: 'ユーザー1' },
        { identity: 'user2', password: createHash('b'), name: 'ユーザー2' },
      ]);
    }
  });
};
