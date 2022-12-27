import { gql } from '@apollo/client';

export const QUERY_MESSAGE = gql`
  query MessageMany($filter: FilterFindManyMessageInput) {
    messageMany(filter: $filter, sort: CREATEDAT_DESC) {
      _id
      public
      title
      message
      createdAt
      updatedAt
      user {
        _id
        name
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation MessageCreate($record: CreateOneMessageInput!) {
    messageCreate(record: $record) {
      record {
        _id
        public
        title
        message
        createdAt
        updatedAt
      }
    }
  }
`;
