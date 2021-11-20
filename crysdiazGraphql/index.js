import { GetEquipo, GetFeaturedServices, GetMainImage } from './home.gql'
import { GetClasslands, GetFaqs } from './classland.gql'
import { GetCmsService, GetCmsServiceDisciplineList } from './services.gql'
import { GetContactInfo, GetUser, CreateUser } from './crysdiaz.gql'

export default {
  queries: {
    // home part
    getEquipo: GetEquipo,
    getFeaturedServices: GetFeaturedServices,
    getMainImage: GetMainImage,
    // classland part
    getClasslands: GetClasslands,
    getContactInfo: GetContactInfo,
    getFaqs: GetFaqs,
    getUser: GetUser,
    // services part
    getCmsService: GetCmsService,
    getCmsServiceDisciplineList: GetCmsServiceDisciplineList,
  },
  mutations: {
    createUser: CreateUser,
  },
}
