import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { requirePermissions } from '../../libs/requirePermissions';
import { UserModel } from '../user/model';
import { IMessage, messageModel } from './model';

export const initMessage = () => {
  const Message = composeWithMongoose(messageModel, {
    inputType: { removeFields: ['user'] },
  });

  schemaComposer.Query.addFields({
    messageById: Message.getResolver('findById'),
    messageMany: Message.getResolver('findMany', [
      (next, ...args) => {
        const user = args[2].user;
        args[1]['filter'] = {
          AND: [{ OR: [{ public: true }, { user }] }, args[1]['filter']].filter((v) => v),
        };
        return next(...args);
      },
    ]),
  });

  const user = schemaComposer.getOrCreateOTC(UserModel.modelName);
  Message.addRelation('user', {
    resolver: user.getResolver('findById').setType('User!'),
    prepareArgs: {
      _id: (source: [] | { user: string }) => {
        if (!Array.isArray(source)) return source.user;
        return user;
      },
    },
    projection: { user: true },
  });

  schemaComposer.Mutation.addFields({
    ...requirePermissions({
      messageCreate: Message.getResolver('createOne', [
        (next, ...args) => {
          const context = args[2];
          (args[3].variableValues.record as IMessage)['user'] = context.user;
          return next(...args);
        },
      ]).removeArg(['record:user']), // データ作成1件
    }),
    messageUpdateById: Message.getResolver('updateById'), // IDでのデータ更新
    messageRemoveById: Message.getResolver('removeById'), // IDでのデータ削除
  });
};
