import fs from 'fs';
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { FileModel } from './model';

export const initFile = () => {
  composeWithMongoose(FileModel);
  schemaComposer.createScalarTC('scalar Upload');
  schemaComposer.Mutation.addFields({
    createFile: {
      name: 'createFile',
      type: 'String!',
      args: { file: 'Upload!' },
      resolve: async (_, { file }) => {
        FileModel.insertMany({
          name: file.originalFilename,
          type: file.mimetype,
          value: fs.readFileSync(file.filepath),
        });
        return 'OK';
      },
    },
  });
};
