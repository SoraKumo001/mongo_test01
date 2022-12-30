import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  MongoID: any;
  Upload: any;
};

export type CreateOneMessageInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  message: Scalars['String'];
  public: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CreateOneMessagePayload = {
  __typename?: 'CreateOneMessagePayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Created document */
  record?: Maybe<Message>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
};

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']>;
};

export type FilterFindManyMessageCreatedAtOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FilterFindManyMessageInput = {
  AND?: InputMaybe<Array<FilterFindManyMessageInput>>;
  OR?: InputMaybe<Array<FilterFindManyMessageInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyMessageOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  message?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyMessageOperatorsInput = {
  _id?: InputMaybe<FilterFindManyMessage_IdOperatorsInput>;
  createdAt?: InputMaybe<FilterFindManyMessageCreatedAtOperatorsInput>;
  updatedAt?: InputMaybe<FilterFindManyMessageUpdatedAtOperatorsInput>;
};

export type FilterFindManyMessageUpdatedAtOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FilterFindManyMessage_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['MongoID'];
  createdAt?: Maybe<Scalars['Date']>;
  message: Scalars['String'];
  public: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
  user: User;
};

export type MongoError = ErrorInterface & {
  __typename?: 'MongoError';
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']>;
  /** MongoDB error message */
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile: Scalars['String'];
  login?: Maybe<Scalars['String']>;
  logout: Scalars['String'];
  /** Create one document with mongoose defaults, setters, hooks and validation */
  messageCreate?: Maybe<CreateOneMessagePayload>;
  /** Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document. */
  messageRemoveById?: Maybe<RemoveByIdMessagePayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  messageUpdateById?: Maybe<UpdateByIdMessagePayload>;
};


export type MutationCreateFileArgs = {
  file: Scalars['Upload'];
};


export type MutationLoginArgs = {
  identity: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMessageCreateArgs = {
  record: CreateOneMessageInput;
};


export type MutationMessageRemoveByIdArgs = {
  _id: Scalars['MongoID'];
};


export type MutationMessageUpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdMessageInput;
};

export type Query = {
  __typename?: 'Query';
  messageById?: Maybe<Message>;
  messageMany: Array<Message>;
  userById?: Maybe<User>;
};


export type QueryMessageByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryMessageManyArgs = {
  filter?: InputMaybe<FilterFindManyMessageInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyMessageInput>;
};


export type QueryUserByIdArgs = {
  _id: Scalars['MongoID'];
};

export type RemoveByIdMessagePayload = {
  __typename?: 'RemoveByIdMessagePayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Removed document */
  record?: Maybe<Message>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export enum SortFindManyMessageInput {
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  UpdatedatAsc = 'UPDATEDAT_ASC',
  UpdatedatDesc = 'UPDATEDAT_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type UpdateByIdMessageInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  message?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type UpdateByIdMessagePayload = {
  __typename?: 'UpdateByIdMessagePayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Updated document */
  record?: Maybe<Message>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['MongoID'];
  identity: Scalars['String'];
  name: Scalars['String'];
};

export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>;
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']>;
};

export type ValidatorError = {
  __typename?: 'ValidatorError';
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int'];
  /** Validation error message */
  message?: Maybe<Scalars['String']>;
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']>;
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']>;
};

export type CreateFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: string };

export type LoginMutationVariables = Exact<{
  identity: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type MessageManyQueryVariables = Exact<{
  filter?: InputMaybe<FilterFindManyMessageInput>;
}>;


export type MessageManyQuery = { __typename?: 'Query', messageMany: Array<{ __typename?: 'Message', _id: any, public: boolean, title: string, message: string, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'User', _id: any, name: string } }> };

export type MessageCreateMutationVariables = Exact<{
  record: CreateOneMessageInput;
}>;


export type MessageCreateMutation = { __typename?: 'Mutation', messageCreate?: { __typename?: 'CreateOneMessagePayload', record?: { __typename?: 'Message', _id: any, public: boolean, title: string, message: string, createdAt?: any | null, updatedAt?: any | null } | null } | null };


export const CreateFileDocument = gql`
    mutation CreateFile($file: Upload!) {
  createFile(file: $file)
}
    `;
export type CreateFileMutationFn = Apollo.MutationFunction<CreateFileMutation, CreateFileMutationVariables>;

/**
 * __useCreateFileMutation__
 *
 * To run a mutation, you first call `useCreateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileMutation, { data, loading, error }] = useCreateFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCreateFileMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileMutation, CreateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument, options);
      }
export type CreateFileMutationHookResult = ReturnType<typeof useCreateFileMutation>;
export type CreateFileMutationResult = Apollo.MutationResult<CreateFileMutation>;
export type CreateFileMutationOptions = Apollo.BaseMutationOptions<CreateFileMutation, CreateFileMutationVariables>;
export const LoginDocument = gql`
    mutation Login($identity: String!, $password: String!) {
  login(identity: $identity, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      identity: // value for 'identity'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MessageManyDocument = gql`
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

/**
 * __useMessageManyQuery__
 *
 * To run a query within a React component, call `useMessageManyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageManyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageManyQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMessageManyQuery(baseOptions?: Apollo.QueryHookOptions<MessageManyQuery, MessageManyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageManyQuery, MessageManyQueryVariables>(MessageManyDocument, options);
      }
export function useMessageManyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageManyQuery, MessageManyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageManyQuery, MessageManyQueryVariables>(MessageManyDocument, options);
        }
export type MessageManyQueryHookResult = ReturnType<typeof useMessageManyQuery>;
export type MessageManyLazyQueryHookResult = ReturnType<typeof useMessageManyLazyQuery>;
export type MessageManyQueryResult = Apollo.QueryResult<MessageManyQuery, MessageManyQueryVariables>;
export const MessageCreateDocument = gql`
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
export type MessageCreateMutationFn = Apollo.MutationFunction<MessageCreateMutation, MessageCreateMutationVariables>;

/**
 * __useMessageCreateMutation__
 *
 * To run a mutation, you first call `useMessageCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessageCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messageCreateMutation, { data, loading, error }] = useMessageCreateMutation({
 *   variables: {
 *      record: // value for 'record'
 *   },
 * });
 */
export function useMessageCreateMutation(baseOptions?: Apollo.MutationHookOptions<MessageCreateMutation, MessageCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MessageCreateMutation, MessageCreateMutationVariables>(MessageCreateDocument, options);
      }
export type MessageCreateMutationHookResult = ReturnType<typeof useMessageCreateMutation>;
export type MessageCreateMutationResult = Apollo.MutationResult<MessageCreateMutation>;
export type MessageCreateMutationOptions = Apollo.BaseMutationOptions<MessageCreateMutation, MessageCreateMutationVariables>;