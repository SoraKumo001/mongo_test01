import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Buffer: any;
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: any;
  Upload: any;
};

export type CreateOneMessageInput = {
  message: Scalars['String'];
  public: Scalars['Boolean'];
  title: Scalars['String'];
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

export type File = {
  __typename?: 'File';
  _id: Scalars['MongoID'];
  createdAt?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  type: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
  value: Scalars['Buffer'];
};

export type FilterFindManyFileCreatedAtOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FilterFindManyFileInput = {
  AND?: InputMaybe<Array<FilterFindManyFileInput>>;
  OR?: InputMaybe<Array<FilterFindManyFileInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyFileOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  value?: InputMaybe<Scalars['Buffer']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyFileOperatorsInput = {
  _id?: InputMaybe<FilterFindManyFile_IdOperatorsInput>;
  createdAt?: InputMaybe<FilterFindManyFileCreatedAtOperatorsInput>;
  updatedAt?: InputMaybe<FilterFindManyFileUpdatedAtOperatorsInput>;
};

export type FilterFindManyFileUpdatedAtOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FilterFindManyFile_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindManyMessageInput = {
  AND?: InputMaybe<Array<FilterFindManyMessageInput>>;
  OR?: InputMaybe<Array<FilterFindManyMessageInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyMessageOperatorsInput>;
  message?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyMessageOperatorsInput = {
  _id?: InputMaybe<FilterFindManyMessage_IdOperatorsInput>;
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
  createdAt: Scalars['Date'];
  message: Scalars['String'];
  public: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
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
  fileById?: Maybe<File>;
  fileMany: Array<File>;
  messageById?: Maybe<Message>;
  messageMany: Array<Message>;
};


export type QueryFileByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryFileManyArgs = {
  filter?: InputMaybe<FilterFindManyFileInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyFileInput>;
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

export enum SortFindManyFileInput {
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  UpdatedatAsc = 'UPDATEDAT_ASC',
  UpdatedatDesc = 'UPDATEDAT_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyMessageInput {
  CreatedatAsc = 'CREATEDAT_ASC',
  CreatedatDesc = 'CREATEDAT_DESC',
  UpdatedatAsc = 'UPDATEDAT_ASC',
  UpdatedatDesc = 'UPDATEDAT_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type UpdateByIdMessageInput = {
  message?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
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


export type MessageManyQuery = { __typename?: 'Query', messageMany: Array<{ __typename?: 'Message', _id: any, public: boolean, title: string, message: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', _id: any, name: string } }> };

export type MessageCreateMutationVariables = Exact<{
  record: CreateOneMessageInput;
}>;


export type MessageCreateMutation = { __typename?: 'Mutation', messageCreate?: { __typename?: 'CreateOneMessagePayload', record?: { __typename?: 'Message', _id: any, public: boolean, title: string, message: string, createdAt: any, updatedAt: any } | null } | null };


export const CreateFileDocument = gql`
    mutation CreateFile($file: Upload!) {
  createFile(file: $file)
}
    `;

export function useCreateFileMutation() {
  return Urql.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument);
};
export const LoginDocument = gql`
    mutation Login($identity: String!, $password: String!) {
  login(identity: $identity, password: $password)
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
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

export function useMessageManyQuery(options?: Omit<Urql.UseQueryArgs<MessageManyQueryVariables>, 'query'>) {
  return Urql.useQuery<MessageManyQuery, MessageManyQueryVariables>({ query: MessageManyDocument, ...options });
};
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

export function useMessageCreateMutation() {
  return Urql.useMutation<MessageCreateMutation, MessageCreateMutationVariables>(MessageCreateDocument);
};