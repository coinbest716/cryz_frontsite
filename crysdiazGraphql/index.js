import { GetContactInfo, GetUser, CreateUser } from './crysdiaz.gql'

export default {
  queries: {
    getUser: GetUser,
    getContactInfo: GetContactInfo,
  },
  mutations: {
    createUser: CreateUser,
  },
}
