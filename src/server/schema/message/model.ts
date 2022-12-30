import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { model, Schema, Types } from 'mongoose';
import { requirePermissions } from '../../libs/requirePermissions';
import { IUser, UserModel } from '../user/model';

/**
 * TypeScript用型情報
 */
export interface IMessage {
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

export const messageModel = model('Message', schema, undefined, { overwriteModels: true });
