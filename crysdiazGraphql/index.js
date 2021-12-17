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
  GetPatientIdByDashboard,
  GetPatientByEmail,
  GetAnthropmetryByDashboard,
  UpdatePatientByDashboard,
  DeletePatientByDashboard,
  UpdateAnthropometry,
  GetAnthroDetailDataByDashboard,
} from './personal.gql'
import { GetAcademy, GetAcademyById, GetAcademyWithPlazas, GetAcademyWithPlazasById } from './academy.gql'
import {
  GetPatientBillByDashboard,
  CreatePatientBillByDashboard,
  UpdatePatientBillByDashboard,
  DeletePatientBillByDashboard,
} from './billing.gql'
import { GetSessionsByDashboard, GetLocationByDashboard } from './calendar.gql'
import {
  GetPurchaseListByDashboard,
  GetWeekDaySessionsByDashboard,
  GetPaymentStatusForDashboard,
  GetPendingQuestionnaireByDashboard,
} from './dashboard.gql'
// shopping part
import {
  GetServicePurchaseByDashboard,
  GetSessionsByIdFromDashboard,
  GetPurchasedOnlinePlanList,
  CancelOnlinePlanSubscriptionByDashboard,
} from './dashboard/shopping.gql'
// message part
import {
  GetUserForMessage,
  GetUsersByPatient,
  GetPatientMessageById,
  GetSubMessagesByDashboard,
  CreateMessageByDashboard,
} from './dashboard/message.gql'

// plans online part
import { GetOnlinePlanByDashboard, GetVideoMaterial, GetAvailablePlanDates } from './dashboard/plans-online.gql'

// purchase
import { Checkout, CheckoutVerify } from './purchase.gql'

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
    getAcademyWithPlazas: GetAcademyWithPlazas,
    getAcademyWithPlazasById: GetAcademyWithPlazasById,

    // contact part
    getContactInfo: GetContactInfo,

    // other part
    getUser: GetUser,

    // profile part
    getPatientIdByDashboard: GetPatientIdByDashboard,
    getPatientByEmail: GetPatientByEmail,
    getAnthropmetryByDashboard: GetAnthropmetryByDashboard,
    getAnthroDetailDataByDashboard: GetAnthroDetailDataByDashboard,

    // billing part
    getPatientBillByDashboard: GetPatientBillByDashboard,

    // dashboard part
    getSessionsByDashboard: GetSessionsByDashboard,
    getLocationByDashboard: GetLocationByDashboard,
    getPurchaseListByDashboard: GetPurchaseListByDashboard,
    getWeekDaySessionsByDashboard: GetWeekDaySessionsByDashboard,
    getPaymentStatusForDashboard: GetPaymentStatusForDashboard,
    getPendingQuestionnaireByDashboard: GetPendingQuestionnaireByDashboard,

    // shopping part
    getServicePurchaseByDashboard: GetServicePurchaseByDashboard,
    getSessionsByIdFromDashboard: GetSessionsByIdFromDashboard,
    getPurchasedOnlinePlanList: GetPurchasedOnlinePlanList,

    // message part
    getUsersByPatient: GetUsersByPatient,
    getUserForMessage: GetUserForMessage,
    getPatientMessageById: GetPatientMessageById,
    getSubMessagesByDashboard: GetSubMessagesByDashboard,

    // plans online part
    getOnlinePlanByDashboard: GetOnlinePlanByDashboard,
    getVideoMaterial: GetVideoMaterial,
    getAvailablePlanDates: GetAvailablePlanDates,

    //purchase
    checkoutVerify: CheckoutVerify,
  },
  mutations: {
    createUser: CreateUser,
    updatePatientByDashboard: UpdatePatientByDashboard,
    deletePatientByDashboard: DeletePatientByDashboard,
    updateAnthropometry: UpdateAnthropometry,
    createPatientBillByDashboard: CreatePatientBillByDashboard,
    updatePatientBillByDashboard: UpdatePatientBillByDashboard,
    deletePatientBillByDashboard: DeletePatientBillByDashboard,

    // message part
    createMessageByDashboard: CreateMessageByDashboard,
    Checkout: Checkout,

    // shopping part
    CancelOnlinePlanSubscriptionByDashboard: CancelOnlinePlanSubscriptionByDashboard,
  },
}
