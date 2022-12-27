import { gql } from '@apollo/client';

export const QUERY_LOGIN = gql`
  mutation Login($identity: String!, $password: String!) {
    login(identity: $identity, password: $password)
  }
`;

export const QUERY_LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
