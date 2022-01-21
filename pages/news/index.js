import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import NewsCard from 'components/components/news/NewsCard'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/news/news.module.scss'

// images
import news from 'public/images/news.svg'

const News = props => {
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
  const [getNewsListForDashboard, { data: newsData, loading: newsLoading, error: newsError }] = useLazyQuery(
    graphql.queries.getNewsListForDashboard
  )
  const [newsInfo, setNewInfo] = useState([])
  const [newsItems, setNewItems] = useState([])
  const [pressItems, setPressItems] = useState([])

  useEffect(() => {
    getNewsListForDashboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!newsError && newsData && newsData.getNewsListForDashboard) {
      let _newsItems = []
      let _pressItems = []
      const _newsData = newsData.getNewsListForDashboard
      setNewInfo(_newsData)
      _newsData.map(data => {
        if (data.category_id === 1) {
          _newsItems.push(data)
        } else {
          _pressItems.push(data)
        }
      })
      console.log('+++++++++++++++ 1: ', _newsData)
      setNewItems(_newsItems.slice(0, 6))
      setPressItems(_pressItems.slice(0, 6))
    }
  }, [newsLoading, newsData, newsError])

  const handleClickMore = category => {
    router.push({ pathname: '/news/categories', query: { category: category } })
  }

  const handleClickDate = id => {
    router.push({ pathname: '/news/detail', query: { id: id } })
  }

  return (
    <>
      {newsInfo.length > 0 ? (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' my-20'}>
              <div className="flex justify-between mt-24">
                <div>
                  <div className={styles.newTopTitle}>News</div>
                  <div className={styles.newTopDash + ' mt-5'} />
                </div>
                <CircularMark />
              </div>
              <div>
                {newsItems.length > 0 ? (
                  <>
                    <div className={styles.categoryTitle + ' mb-9'}>Novedades CrysDyaz & Co</div>
                    <div
                      className={
                        'grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:sm:grid-cols-1 gap-8 flex justify-center'
                      }
                    >
                      {newsItems.map((item, index) => (
                        <NewsCard item={item} key={index} handleClickDate={handleClickDate} />
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <div
                        className={styles.seeAll + ' mt-10 mb-7 cursor-pointer w-fit'}
                        onClick={() => handleClickMore('news')}
                      >
                        Ver todas
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {pressItems.length > 0 ? (
                  <>
                    <div className={styles.categoryTitle + ' mb-9'}>Apariciones en prensa</div>
                    <div
                      className={
                        'grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:sm:grid-cols-1 gap-8 flex justify-center'
                      }
                    >
                      {pressItems.map((item, index) => (
                        <NewsCard item={item} key={index} handleClickDate={handleClickDate} />
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <div
                        className={styles.seeAll + ' mt-10 mb-7 cursor-pointer w-fit'}
                        onClick={() => handleClickMore('press')}
                      >
                        Ver todas
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + (viewport === 'mobile' ? ' pt-8' : ' pt-20')}>
              <div className={'h-1/3 flex items-center'}>
                <div>
                  <div className={styles.topTitle}>PRÓXIMAMENTE…</div>
                  <div className={styles.topDash + (viewport === 'mobile' ? ' mt-2' : ' mt-4')} />
                </div>
              </div>
              <div className={'h-1/3 flex items-center justify-center'}>
                <div>
                  <div className={'flex justify-center'}>
                    <Image
                      src={news}
                      width={viewport === 'mobile' ? 273 : 400}
                      height={viewport === 'mobile' ? 52 : 93}
                      alt=""
                    />
                  </div>

                  <div className={styles.description}>
                    Un espacio exclusivo dónde puedes consultar todas las novedades y últimas publicaciones de
                    CrysDyaz&Co
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default News

News.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
