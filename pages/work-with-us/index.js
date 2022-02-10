import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import WorkWithCard from 'components/Workwithus/WorkWithCard'
import MobileWorkWithCard from 'components/Workwithus/MobileWorkWithCard'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './workwithus.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const WorkWithUs = props => {
  const router = useRouter()
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

  // variables
  const { viewport } = props
  const [getJobListForDashboard, { data: withData, loading: withLoading, error: withError }] = useLazyQuery(
    graphql.queries.getJobListForDashboard
  )
  const [mainInfo, setMainInfo] = useState([])

  // handlers
  useEffect(() => {
    getJobListForDashboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch({ type: 'set', isLoading: withLoading })
    if (!withError && withData && withData.getJobListForDashboard) {
      setMainInfo(withData.getJobListForDashboard)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withLoading, withData, withError])

  const handleClickOffer = id => {
    router.push({
      pathname: '/work-with-us/detail',
      query: {
        id: id,
      },
    })
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>
          <div className="w-full p-4 my-5">
            {mainInfo.length > 0 ? (
              <>
                <div className={styles.m_topTitle}>Trabaja con nosotros</div>
                <div className={styles.m_topDash + ' mt-2 mb-10'} />
                <div className={'grid grid-cols-2 gap-3 flex justify-center'}>
                  {mainInfo.map((item, index) => (
                    <MobileWorkWithCard item={item} key={index} handleClickOffer={handleClickOffer} />
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' my-20'}>
              <div className="flex justify-between mt-24 mb-8">
                <div>
                  <div className={styles.topTitle}>Trabaja con nosotros</div>
                  <div className={styles.topDash + ' mt-5'} />
                </div>
                <CircularMark />
              </div>
              <div>
                {mainInfo.length > 0 ? (
                  <div
                    className={
                      'grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:sm:grid-cols-1 gap-8 flex justify-center'
                    }
                  >
                    {mainInfo.map((item, index) => (
                      <WorkWithCard item={item} key={index} handleClickOffer={handleClickOffer} />
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WorkWithUs

WorkWithUs.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
