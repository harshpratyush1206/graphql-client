import { ApolloClient, gql, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import store from '../../store'
import ToastProvider from './ToastProvider';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(email: $username, password:$password) {
    bearerToken
    expiresOn,
    userType
  }
}`


const CREATE_ACCOUNT =  gql`
mutation createBankDetails($bankDetailModel: BankDetailsModel!) {
    createBankDetails(bankDetailModel: $bankDetailModel) {
        accountNumber,
        branchCode
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
 
const ALL_BRANCH= gql`query ALL_BRANCH{
    allBranches{
        id,
        branchCode,
        city,
        country,
        street,
        zip
      }
}`


const ALL_CLIENT= gql`query ALL_CLIENT{
    allClients{
        id,
        firstName,
        lastName,
        email,
        contact,
        city,
        country,
        street,
        zip
      }
}`


const ALL_BRANCH_CLIENT= gql`query ALL_BRANCH_CLIENT{
    allClients{
        id,
        firstName,
        lastName,
        email,
        contact,
        city,
        country,
        street,
        zip
      },
      allBranches{
        id,
        branchCode,
        city,
        country,
        street,
        zip
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
        });
 } 

 export function getAllBranches():Promise<any>{
     return getClient().query({
         query:ALL_BRANCH
     })
 }

 
 export function getAllClients():Promise<any>{
    return getClient().query({
        query:ALL_CLIENT
    })
}

export function getAllClientsAndBranch():Promise<any>{
    return getClient().query({
        query:ALL_BRANCH_CLIENT
    })
}

export function createAccount(bankDetailModel:any):Promise<any>{
    return getClient().mutate({
        mutation:CREATE_ACCOUNT,
        variables:{bankDetailModel}
    })
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

export function handleError(e:any){
  if([401,403].indexOf(e.networkError?.response?.status)>-1){
      ToastProvider.error("Please re-login");
  }
  else{
        e.graphQLErrors.forEach((element:any) => {
            ToastProvider.error(element.message);
        });
      }
}