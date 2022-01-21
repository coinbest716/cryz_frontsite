import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// custom components
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import NewsCard from 'components/news/NewsCard'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
// styles

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './categories.module.scss'

const Categoris = props => {
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
  const [getNewsListWithCategory, { data: newsData, loading: newsDataLoading, error: newsDataError }] = useLazyQuery(
    graphql.queries.getNewsListWithCategory
  )
  const [categoryId, setCategoryId] = useState(0)
  const [newsInfo, setNewsInfo] = useState([])

  useEffect(() => {
    if (router.query.category_id) {
      setCategoryId(Number(router.query.category_id))
      getNewsListWithCategory({
        variables: {
          category_id: Number(router.query.category_id),
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (!newsDataError && newsData && newsData.getNewsListWithCategory) {
      setNewsInfo(newsData.getNewsListWithCategory)
    }
  }, [newsDataLoading, newsData, newsDataError])

  const handleClickDate = id => {
    router.push({ pathname: '/news/detail', query: { id: id } })
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' my-20'}>
          <div className={'mt-9'}>
            <BackButton viewport={viewport} />
          </div>
          <div className="flex justify-between mt-10">
            <div>
              <div className={styles.newTopTitle}>News</div>
              <div className={styles.newTopDash + ' mt-5'} />
            </div>
            <CircularMark />
          </div>
          <div>
            {newsInfo.length > 0 ? (
              <>
                <div className={styles.categoryTitle + ' mb-9'}>
                  {categoryId === 1 ? 'Novedades CrysDyaz & Co' : 'Apariciones en prensa'}
                </div>
                <div
                  className={
                    'grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:sm:grid-cols-1 gap-8 flex justify-center'
                  }
                >
                  {newsInfo.map((item, index) => (
                    <NewsCard item={item} key={index} handleClickDate={handleClickDate} />
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Categoris

Categoris.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
