import { GetContactInfo, GetUser, CreateUser } from './crysdiaz.gql'
import { GetClasslands, GetFaqs } from './classland.gql'

export default {
  queries: {
    getClasslands: GetClasslands,
    getContactInfo: GetContactInfo,
    getFaqs: GetFaqs,
    getUser: GetUser,
  },
  mutations: {
    createUser: CreateUser,
  },
}
