import { schemaComposer } from 'graphql-compose';

schemaComposer.clear();

require('./models/user');
require('./models/message');
export default schemaComposer.buildSchema();
