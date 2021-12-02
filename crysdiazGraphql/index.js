import { GetEquipo, GetFeaturedServices, GetMainImage } from './home.gql'
import {
  GetFemHealth,
  GetDisciplineList,
  GetFemHealthService,
  GetFemHealthServiceSubjectByType,
} from './female-health.gql'
import { GetClasslandMain, GetClasslandCategory, GetClasslandFaqs } from './classland.gql'
import {
  GetCmsService,
  GetCmsServiceDisciplineList,
  GetCmsServiceSubject,
  GetCmsServiceSubjectByType,
} from './services.gql'
import { GetContactInfo, GetUser, CreateUser } from './crysdiaz.gql'
import {
  GetPatientByEmail,
  GetAnthropmetryByDashboard,
  UpdatePatientByDashboard,
  DeletePatientByDashboard,
  UpdateAnthropometry,
  GetAnthroDetailDataByDashboard,
} from './personal.gql'
import { GetAcademy, GetAcademyById } from './academy.gql'

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
    getFemHealthServiceSubjectByType: GetFemHealthServiceSubjectByType,
    // classland part
    getClasslandMain: GetClasslandMain,
    getClasslandCategory: GetClasslandCategory,
    getClasslandFaqs: GetClasslandFaqs,
    // services part
    getCmsService: GetCmsService,
    getCmsServiceDisciplineList: GetCmsServiceDisciplineList,
    getCmsServiceSubject: GetCmsServiceSubject,
    getCmsServiceSubjectByType: GetCmsServiceSubjectByType,
    // academy part
    getAcademy: GetAcademy,
    getAcademyById: GetAcademyById,
    // contact part
    getContactInfo: GetContactInfo,

    // other part
    getUser: GetUser,
    // profile part
    getPatientByEmail: GetPatientByEmail,
    getAnthropmetryByDashboard: GetAnthropmetryByDashboard,
    getAnthroDetailDataByDashboard: GetAnthroDetailDataByDashboard,

    // dashboard part
    // message part
    getUsersByPatient: GetUsersByPatient,
  },
  mutations: {
    createUser: CreateUser,
    updatePatientByDashboard: UpdatePatientByDashboard,
    deletePatientByDashboard: DeletePatientByDashboard,
    updateAnthropometry: UpdateAnthropometry,
  },
}
