import { GetUser, CreateUser } from './crysdiaz.gql'

export default {
  queries: {
    getUser: GetUser,
  },
  mutations: {
    createUser: CreateUser,
  },
}
