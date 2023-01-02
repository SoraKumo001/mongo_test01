import fs from 'fs';
import { File } from 'formidable';
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { FileModel } from './model';

export const initFile = () => {
  const File = composeWithMongoose(FileModel);

  schemaComposer.Query.addFields({
    fileById: File.getResolver('findById'),
    fileMany: File.getResolver('findMany', [
      (next, ...args) => {
        const user = args[2].user;
        args[1]['filter'] = {
          AND: [{ OR: [{ public: true }, { user }] }, args[1]['filter']].filter((v) => v),
        };
        return next(...args);
      },
    ]),
  });

  schemaComposer.createScalarTC('scalar Upload');
  schemaComposer.Mutation.addFields({
    createFile: {
      name: 'createFile',
      type: 'String!',
      args: { file: 'Upload!' },
      resolve: async (_, { file }: { file: File }, { user }: { user?: string }) => {
        if (user) {
          const result = await FileModel.create({
            name: file.originalFilename,
            type: file.mimetype,
            value: fs.readFileSync(file.filepath),
          });
          if (result) return result.id;
        }
        throw 'upload error';
      },
    },
  });
};
