//import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';
import Link from 'next/link';
import {
  MessageManyDocument,
  MessageManyQuery,
  MessageManyQueryVariables,
  useCreateFileMutation,
  useLoginMutation,
  useLogoutMutation,
  useMessageCreateMutation,
} from '../generated/graphql';
import { useAuth } from '../libs/apollo-auth';
import { useSuspenseQuery } from '../libs/useSuspenseQuery';
//import { QUERY_TOKEN } from '../query/test';

const Page = () => {
  const { data, refetch } = useSuspenseQuery<MessageManyQuery, MessageManyQueryVariables>(
    MessageManyDocument,
    { suspensePolicy: 'initial' }
  );
  const { setToken, info } = useAuth();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [createMessage] = useMessageCreateMutation();
  const [createFile] = useCreateFileMutation();
  // const { data: data2, error } = useQuery(QUERY_TOKEN);
  // console.log(data2, error);
  return (
    <div>
      <div>
        <Link href="/api/graphql">GraphQL Explorer</Link>
      </div>
      <button
        onClick={() => {
          const file = new Blob(['test'], { type: 'text/plain' });
          createFile({
            variables: {
              file,
            },
          });
        }}
      >
        create
      </button>
      {!info ? (
        <form
          onSubmit={(e) => {
            const node = e.currentTarget;
            const identity = node.identity.value;
            const password = node.password.value;
            login({ variables: { identity, password } }).then(({ data }) => {
              if (data?.login) {
                setToken(data.login);
              }
            });
            e.preventDefault();
          }}
        >
          <input id="identity" />
          <input id="password" type="password" />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <button
            onClick={() => {
              logout().then(() => {
                setToken(undefined);
              });
            }}
          >
            Logout
          </button>
          <span> {info.name}</span>
        </div>
      )}
      <hr />
      {info && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const node = e.currentTarget;
            const _public = node._public.checked;
            const _title = node._title.value;
            const _message = node._message.value;
            createMessage({
              variables: { record: { public: _public, title: _title, message: _message } },
            }).then(() => {
              refetch();
            });
          }}
        >
          <button type="submit">Send</button>
          <label>
            Public
            <input type="checkbox" id="_public" />
          </label>
          Title:
          <input id="_title" />
          <div>
            <textarea id="_message" cols={40} rows={5} />
          </div>
        </form>
      )}
      <div>
        <button
          onClick={() => {
            refetch();
          }}
        >
          Reload
        </button>
      </div>
      {data?.messageMany.map((m) => (
        <div key={m._id}>
          <div>
            {new Date(m.createdAt).toLocaleString()} [{m.user.name}] {m.title}
          </div>
          {m.message}
        </div>
      ))}
    </div>
  );
};

export default Page;
