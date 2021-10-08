import { ApolloClient, DocumentNode, gql, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
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


const CREATE_ACCOUNT = gql`
mutation createBankAccount($bankDetailModel: BankDetailsModel!) {
  createBankAccount(bankDetailModel: $bankDetailModel) {
        accountNumber,
        branchCode
  }
}`


const CREATE_BRANCH = gql`
mutation createBranch($branchDetails: BranchDetailsModel!) {
  createBranch(branchDetails: $branchDetails) {
    id
    branchCode
    city
    country
    street
    zip
    address
    createdBy
    createdOn
    lastModifiedBy
    lastModifiedOn
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

const ALL_BRANCH_CLIENT = gql`query ALL_BRANCH_CLIENT{
    allClients{
        id,
        firstName,
        lastName,
        email,
        contact,
        city,
        country,
        street,
        zip,
        fullName
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

export function login(username: string, password: string): Promise<any> {
  return getClient()
    .mutate({
      mutation: LOGIN,
      variables: { username, password }
    }
    );
}

export function prepareQuery(colsIncluded: any[], name: string) {

  let query = `query ${name} { ${name} {
    ${colsIncluded.map(col => {
    return col.value
  })}
  }
}`
  console.log(query);
  return gql(query)
}

export function executeQuery(graphqlQuery: DocumentNode): Promise<any> {
  return getClient().query({
    query: graphqlQuery
  });
}

export function getAllbank(): Promise<any> {
  return executeQuery(ALL_BANK)
}

export function getAllClientsAndBranch(): Promise<any> {
  return executeQuery(ALL_BRANCH_CLIENT)
}

export function createAccount(bankDetailModel: any): Promise<any> {
  return getClient().mutate({
    mutation: CREATE_ACCOUNT,
    variables: { bankDetailModel }
  })
}

export function createBranch(branchDetails: any): Promise<any> {
  return getClient().mutate({
    mutation: CREATE_BRANCH,
    variables: { branchDetails }
  })
}

function getClient(): ApolloClient<NormalizedCacheObject> {
  const authLink = setContext((_, { headers }) => {
    const token = store.store.getState().posts.token;
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

export function handleError(e: any) {
  console.log(e)
  if ([401, 403].indexOf(e.networkError?.response?.status) > -1) {
    ToastProvider.error("Please re-login");
  }
  else if (e.graphQLErrors && e.graphQLErrors.length) {
    e.graphQLErrors.forEach((element: any) => {
      ToastProvider.error(element.message);
    });
  }
  else {
    ToastProvider.error(e.message)
  }
}