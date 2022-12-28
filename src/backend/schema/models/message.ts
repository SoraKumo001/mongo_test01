import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { model, Schema, Types } from 'mongoose';
import { requirePermissions } from '../../libs/requirePermissions';
import { IUser, userModel } from './user';

/**
 * TypeScript用型情報
 */
interface IMessage {
  public: boolean;
  title: string;
  message: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * MongoDB用型情報
 */

const schema = new Schema<IMessage>(
  {
    public: { type: Boolean, required: true, default: false },
    title: { type: String, required: true },
    message: { type: String, required: true },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

const messageModel = model('Message', schema, undefined, { overwriteModels: true });

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

const user = schemaComposer.getOrCreateOTC(userModel.modelName);

Message.addRelation('user', {
  resolver: user.getResolver('findById'),
  prepareArgs: {
    _id: (source: [] | { user: string }) => {
      if (!Array.isArray(source)) return source.user;
      return null;
    },
  },
  projection: { user: true },
});

schemaComposer.Mutation.addFields({
  ...requirePermissions({
    messageCreate: Message.getResolver('createOne', [
      (next, ...args) => {
        const context = args[2];
        args[3].variableValues.record['user'] = context.user;
        return next(...args);
      },
    ]).removeArg(['record:user']), // データ作成1件
  }),
  messageUpdateById: Message.getResolver('updateById'), // IDでのデータ更新
  messageRemoveById: Message.getResolver('removeById'), // IDでのデータ削除
});
