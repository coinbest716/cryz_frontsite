import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// next components
import Image from 'next/image'
import router from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './cursos.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import { Auth } from 'aws-amplify'
import toast from 'react-hot-toast'
import moment from 'moment'

const Cursos = () => {
  const [courses, setCourses] = useState([])

  const [getCourses, { data: coursesData, loading: coursesLoading, error: coursesError }] = useLazyQuery(
    graphql.queries.getCoursesDashboard
  )

  useEffect(() => {
    if (courses.length === 0 && courses !== 'undefined') {
      getCourses()
    }
  }, [courses, getCourses])

  useEffect(() => {
    if (!coursesError && coursesData) {
      if (coursesData === null) {
      } else {
        setCourses(coursesData.getCoursesDashboard)
      }
    }
  }, [coursesLoading, coursesData, coursesError])

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {})
      .catch(error => {
        toast.error(error.message)
        router.push('/')
      })
  }, [])

  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Cursos</div>

        <div className={styles.tableCellText}>
          {/* year select part */}
          <div className={styles.yearArea}></div>
          {/* table part */}
          <div className={'inline-grid'}></div>
        </div>
      </div>
      <div>
        <PerfectScrollbar>
          <table className={'w-full table-auto'}>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>DETALLE</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>VER</div>
                </th>
              </tr>
            </thead>
            <tbody className={'mt-4 ' + styles.tbody}>
              {courses &&
                courses.map((course, index) => (
                  <tr key={index} className={1 % 2 === 1 ? 'bg-white' : ''}>
                    <td className={'h-full relative'}>
                      <div className={styles.tableContentArea + ' ' + styles.tableCellText}>{course.name}</div>
                    </td>
                    <td className={'h-full relative'}>
                      <div className={styles.tableContentArea}>
                        <Link href={`/dashboard/cursos/${course.id}`}>
                          <Image src={FileViewIcon} alt={''} width={29} height={29} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </PerfectScrollbar>
      </div>
    </div>
  )
}
export default Cursos

Cursos.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
