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
import {
  GetAcademy,
  GetAcademyById,
  GetAcademyWithPlazas,
  GetAcademyWithPlazasById,
  GetPatientAcademy,
  GetAcademyPurchaseStatus,
} from './academy.gql'
import { GetNewsListForDashboard, GetNewsByIdForDashboard, GetNewsListWithCategory } from './news.gql'
import {
  GetPatientBillByDashboard,
  GetPatientBillByDashboardById,
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
  GetSessionMaterialByDashboard,
  UpdateCompletedQuestionnaireByDashboard,
} from './dashboard.gql'
// shopping part
import {
  GetServicePurchaseByDashboard,
  GetPurchasesFromBillNumber,
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
  DeleteMessageByDashboard,
} from './dashboard/message.gql'

// plans online part
import {
  GetOnlinePlanByDashboard,
  GetVideoLinkById,
  GetVideoMaterial,
  GetAvailablePlanDates,
} from './dashboard/plans-online.gql'

// nutrition part
import { GetNutritionsForDashboard, GetNutritionPurchaseStatus } from './dashboard/nutrition.gql'

// store part
import {
  FilterStoreCategories,
  GetProductById,
  FilterProducts,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from './products.gql'

// purchase
import { Checkout, CheckoutVerify } from './purchase.gql'

import { SendCV, GetJobListForDashboard, GetJobByIdForDashboard } from './workwithus.gql'

// courses

import { getCoursesDashboard, getCourseDashboard, GetCourseLectureDashboard } from './dashboard/course.gql'

export default {
  queries: {
    // Course
    getCoursesDashboard: getCoursesDashboard,
    getCourseDashboard: getCourseDashboard,
    GetCourseLectureDashboard: GetCourseLectureDashboard,

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
    getPatientAcademy: GetPatientAcademy,
    getAcademyPurchaseStatus: GetAcademyPurchaseStatus,

    // news part
    getNewsListForDashboard: GetNewsListForDashboard,
    getNewsByIdForDashboard: GetNewsByIdForDashboard,
    getNewsListWithCategory: GetNewsListWithCategory,

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
    getPatientBillByDashboardById: GetPatientBillByDashboardById,

    // dashboard part
    getSessionsByDashboard: GetSessionsByDashboard,
    getLocationByDashboard: GetLocationByDashboard,
    getPurchaseListByDashboard: GetPurchaseListByDashboard,
    getWeekDaySessionsByDashboard: GetWeekDaySessionsByDashboard,
    getPaymentStatusForDashboard: GetPaymentStatusForDashboard,
    getPendingQuestionnaireByDashboard: GetPendingQuestionnaireByDashboard,
    getSessionMaterialByDashboard: GetSessionMaterialByDashboard,

    // shopping part
    getServicePurchaseByDashboard: GetServicePurchaseByDashboard,
    getPurchasesFromBillNumber: GetPurchasesFromBillNumber,
    getSessionsByIdFromDashboard: GetSessionsByIdFromDashboard,
    getPurchasedOnlinePlanList: GetPurchasedOnlinePlanList,

    // message part
    getUsersByPatient: GetUsersByPatient,
    getUserForMessage: GetUserForMessage,
    getPatientMessageById: GetPatientMessageById,
    getSubMessagesByDashboard: GetSubMessagesByDashboard,

    // plans online part
    getOnlinePlanByDashboard: GetOnlinePlanByDashboard,
    getVideoLinkById: GetVideoLinkById,
    getVideoMaterial: GetVideoMaterial,
    getAvailablePlanDates: GetAvailablePlanDates,

    // nutrition part
    getNutritionsForDashboard: GetNutritionsForDashboard,
    getNutritionPurchaseStatus: GetNutritionPurchaseStatus,

    // store part
    filterStoreCategories: FilterStoreCategories,
    getProductById: GetProductById,
    filterProducts: FilterProducts,

    //purchase
    checkoutVerify: CheckoutVerify,

    // work with us
    getJobListForDashboard: GetJobListForDashboard,
    getJobByIdForDashboard: GetJobByIdForDashboard,
  },
  mutations: {
    createUser: CreateUser,
    updatePatientByDashboard: UpdatePatientByDashboard,
    deletePatientByDashboard: DeletePatientByDashboard,
    updateAnthropometry: UpdateAnthropometry,
    createPatientBillByDashboard: CreatePatientBillByDashboard,
    updatePatientBillByDashboard: UpdatePatientBillByDashboard,
    deletePatientBillByDashboard: DeletePatientBillByDashboard,

    // dashboard
    updateCompletedQuestionnaireByDashboard: UpdateCompletedQuestionnaireByDashboard,

    // message part
    createMessageByDashboard: CreateMessageByDashboard,
    deleteMessageByDashboard: DeleteMessageByDashboard,

    // store part
    createProduct: CreateProduct,
    updateProduct: UpdateProduct,
    deleteProduct: DeleteProduct,

    // purchase
    Checkout: Checkout,

    // shopping part
    CancelOnlinePlanSubscriptionByDashboard: CancelOnlinePlanSubscriptionByDashboard,
    SendCV: SendCV,
  },
}
