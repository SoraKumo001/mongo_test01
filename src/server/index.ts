import { apolloHandler } from './libs/apollo';
import { connect } from './mongodb';

connect();

export default apolloHandler;
export const config = {
  api: {
    bodyParser: false,
  },
};
