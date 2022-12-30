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
