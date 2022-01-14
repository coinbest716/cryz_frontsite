import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// third party components
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'
import ReactPlayer from 'react-player'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './leccion.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'
import DownloadIcon from 'assets/images/download.svg'
import DownloadDisableIcon from 'assets/images/download-disable.svg'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Lecture = () => {
  const [lecture, setLecture] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const { leccion } = router.query

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

  const [getLecture, { data: lectureData, loading: lectureLoading, error: lectureError }] = useLazyQuery(
    graphql.queries.GetCourseLectureDashboard
  )

  useEffect(() => {
    console.log(lecture)
    if (lecture === null && id && leccion) {
      getLecture({
        variables: {
          courseId: Number(id),
          lectureId: Number(leccion),
        },
      })
    }
  }, [lecture, getLecture, id, leccion])

  useEffect(() => {
    if (!lectureError && lectureData) {
      if (lectureData === null) {
      } else {
        console.log(lectureData)
        setLecture(lectureData.getCourseLectureDashboard)
      }
    }
  }, [lectureLoading, lectureData, lectureError])

  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>{lecture?.name}</div>

        <div className={styles.tableCellText}>
          {/* year select part */}
          <div className={styles.yearArea}></div>
          {/* table part */}
          <div className={globalStyles.textocurso} dangerouslySetInnerHTML={{ __html: lecture?.description }} />
        </div>
      </div>
      <div className={globalStyles.videocurso}>
        <ReactPlayer url={lecture?.video} width="100%" controls={true} />
      </div>
    </div>
  )
}
export default Lecture

Lecture.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
