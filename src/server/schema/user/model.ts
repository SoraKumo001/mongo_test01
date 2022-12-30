import { model, Schema } from 'mongoose';

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
export const UserModel = model('User', schema, undefined, { overwriteModels: true });
