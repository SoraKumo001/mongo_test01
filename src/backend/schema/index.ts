import { schemaComposer } from 'graphql-compose';

schemaComposer.clear();

require('./models/user');
require('./models/message');
require('./models/file');
export default schemaComposer.buildSchema();
