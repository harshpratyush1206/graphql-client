import { ApolloClient, gql, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import store from '../../store'


const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

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
    return getClient()
    .mutate({
    mutation:LOGIN,
    variables: {username,password}
    }
  );
}

 export function getAllbank():Promise<any>{
        return getClient().query({
            query:ALL_BANK,  
        }).catch(error=>{
            console.log(`this is the ${error}`)
        });
 } 

function getClient():ApolloClient<NormalizedCacheObject>{
    const authLink = setContext((_, { headers }) => {
        const token = store.store.getState().posts.token;
        return {
          headers: {
            ...headers,
            Authorization : token ? `Bearer ${token}` : "",
          }
        }
      });
      
    return  new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
      });
 }