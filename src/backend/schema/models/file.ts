import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { model, Schema, Types } from 'mongoose';
import fs from 'fs';
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

schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });
const fileModel = model('File', schema, undefined, { overwriteModels: true });

const file = composeWithMongoose(fileModel);
schemaComposer.createScalarTC('scalar Upload');
schemaComposer.Mutation.addFields({
  createFile: {
    name: 'createFile',
    type: 'String!',
    args: { file: 'Upload!' },
    resolve: async (_, { file }, context) => {
      fileModel.insertMany({
        name: file.originalFilename,
        type: file.mimetype,
        value: fs.readFileSync(file.filepath),
      });
      return 'OK';
    },
  },
});
