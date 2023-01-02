import { promises as fs } from 'fs';
import { printSchema } from 'graphql';
import { schemaComposer } from 'graphql-compose';
import { initFile } from './file/compose';
import { initMessage } from './message/compose';
import { initUser } from './user/compose';

// 既存のtypeをクリア
schemaComposer.clear();

// 各Composeの作成
initUser();
initMessage();
initFile();

//GraphQLスキーマの作成
export const schema = schemaComposer.buildSchema();

if (process.env.NODE_ENV === 'development') {
  fs.writeFile('graphql/schema.graphql', printSchema(schema), { encoding: 'utf8' });
}
