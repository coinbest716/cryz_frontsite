import { GetEquipo, GetFeaturedServices, GetMainImage } from './home.gql'
import { GetFemHealth, GetDisciplineList, GetFemHealthService } from './female-health.gql'
import { GetClasslandMain, GetClasslandCategory, GetClasslandFaqs } from './classland.gql'
import { GetCmsService, GetCmsServiceDisciplineList } from './services.gql'
import { GetContactInfo, GetUser, CreateUser } from './crysdiaz.gql'
import { GetPersonalInfo, SavePersonalInfo, DeletePersonalInfo } from './personal.gql'

// dashboard part
import { GetUsersByPatient } from './dashboard/message.gql'

export default {
  queries: {
    // home part
    getEquipo: GetEquipo,
    getFeaturedServices: GetFeaturedServices,
    getMainImage: GetMainImage,
    // female health part
    getFemHealth: GetFemHealth,
    getDisciplineList: GetDisciplineList,
    getFemHealthService: GetFemHealthService,
    // classland part
    getClasslandMain: GetClasslandMain,
    getClasslandCategory: GetClasslandCategory,
    getClasslandFaqs: GetClasslandFaqs,
    // services part
    getCmsService: GetCmsService,
    getCmsServiceDisciplineList: GetCmsServiceDisciplineList,

    // contact part
    getContactInfo: GetContactInfo,

    // other part
    getUser: GetUser,
    getPersonalInfo: GetPersonalInfo,

    // dashboard part
    // message part
    getUsersByPatient: GetUsersByPatient,
  },
  mutations: {
    createUser: CreateUser,
    savePersonalInfo: SavePersonalInfo,
    deletePersonalInfo: DeletePersonalInfo,
  },
}
