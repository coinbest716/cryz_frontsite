import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// third party components
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from '../cursos.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'
import DownloadIcon from 'assets/images/download.svg'
import DownloadDisableIcon from 'assets/images/download-disable.svg'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import moment from 'moment'

const Curso = () => {
  const [course, setCourse] = useState([])
  const router = useRouter()
  const { id } = router.query

  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  const [getCourse, { data: courseData, loading: courseLoading, error: courseError }] = useLazyQuery(
    graphql.queries.getCourseDashboard
  )

  //console.log(Number(id))

  useEffect(() => {
    if (course.length === 0 && course !== 'undefined' && id) {
      getCourse({
        variables: {
          getCourseId: Number(id),
        },
      })
    }
  }, [course, getCourse, id])

  useEffect(() => {
    if (!courseError && courseData) {
      if (courseData === null) {
      } else {
        setCourse(courseData.getCourseDashboard)
      }
    }
  }, [courseLoading, courseData, courseError])

  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>{course?.name}</div>

        <div className={styles.tableCellText}>
          {/* year select part */}
          <div className={styles.yearArea}></div>
          {/* table part */}
          <div className={'inline-grid'} dangerouslySetInnerHTML={{ __html: course?.description }} />
        </div>
      </div>
      {/* year select part */}
      <div className={styles.yearArea}></div>
      {/* table part */}
      <div>
        <PerfectScrollbar>
          <table className={'w-full table-auto'}>
            {course.lectures &&
              course.lectures.map((lecture, index) => {
                return (
                  <>
                    <thead key={`head-${index}`} className={styles.tableHead}>
                      <tr>
                        <th>
                          <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>LECCIÓN</div>
                        </th>
                        <th>
                          <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>{lecture.name}</div>
                        </th>
                        <th>
                          <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>VIDEO</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody key={`body-${index}`} className={'mt-4 ' + styles.tbody}>
                      <tr className={1 % 2 === 1 ? 'bg-white' : ''}>
                        <td className={'h-full relative'}>
                          <div
                            className={
                              'absolute top-0 bottom-0 flex flex-col justify-around ' +
                              styles.tableContentArea +
                              ' ' +
                              styles.tableCellText
                            }
                          >
                            <div className={'flex items-start'}>{lecture.order}</div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                            <div className={'inline-grid'} dangerouslySetInnerHTML={{ __html: lecture?.description }} />
                          </div>
                        </td>
                        <td className={'h-full relative'}>
                          <div
                            className={
                              'absolute top-0 bottom-0 flex flex-col justify-around ' +
                              styles.tableContentArea +
                              ' ' +
                              styles.tableCellText
                            }
                          >
                            <Link href={`/dashboard/cursos/${id}/${lecture.id}`} target={'_blank'}>
                              <Image src={FileViewIcon} alt={''} width={29} height={29} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
                )
              })}
          </table>
        </PerfectScrollbar>
      </div>
    </div>
  )
}
export default Curso

Curso.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
