import { model, Schema, Types } from 'mongoose';
/**
 * TypeScript用型情報
 */
interface IFile {
  name: String;
  type: String;
  value: Types.Buffer;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * MongoDB用型情報
 */

const schema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    value: {
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

// インデックスの作成
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

export const FileModel = model('File', schema, undefined, { overwriteModels: true });
