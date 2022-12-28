import { gql } from '@apollo/client';

export const QUERY_FILE = gql`
  mutation CreateFile($file: Upload!) {
    createFile(file: $file)
  }
`;
