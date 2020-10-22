import { ApolloClient, ApolloLink, concat, gql, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXJzaGJhbmtlcjFAZW5jcnlwdC5jb20iLCJpc3MiOiJncmFwcWwtc2VydmVyIiwiZXhwIjoxNjAzNDE1Mzk0LCJpYXQiOjE2MDM0MDA5OTR9.9bZXt43wTzQ57JWNNQZIJE147e1j49r3zVBUWIJGTfuXcQvMgnN9ZRtvnN_CH7IzgljhDGcWhXunpOi2HbhJ2A' || null,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(email: $username, password:$password) {
    token
    expiresOn
  }
}`


const ALL_BANK = gql`query ALL_BANK{
    allBank{
        accountNumber,
        branchCode,
        accountStatus,
        balance,
        user{
          firstName
          lastName
        }
      }
}`

export function login(username:string,password:string):Promise<any>{
    return client
    .mutate({
    mutation:LOGIN,
    variables: {username,password}
    }
  );
}

 export function getAllbank():Promise<any>{
        return client.query({
            query:ALL_BANK,
            
        })
 } 