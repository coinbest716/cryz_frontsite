import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import NewsCard from 'components/news/NewsCard'
import MobileNewsCard from 'components/news/MobileNewsCard'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './news.module.scss'

// images
import news from 'public/images/news.svg'
import ArrowRightGray from 'public/images/arrow-right-gray.svg'

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
      const _newsData = newsData.getNewsListForDashboard
      setNewInfo(_newsData)
      sortItems(_newsData)
    }
  }, [newsLoading, newsData, newsError])

  useEffect(() => {
    sortItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport])

  const sortItems = _newsData => {
    let _newsItems = []
    let _pressItems = []
    const newArr = _newsData ? _newsData : newsInfo
    newArr.map(data => {
      if (data.category_id === 1 && _newsItems.length <= 6) {
        _newsItems.push(data)
      } else if (data.category_id === 2 && _pressItems.length <= 6) {
        _pressItems.push(data)
      }
    })
    if (viewport === 'mobile') {
      setNewItems(_newsItems.slice(0, 4))
      setPressItems(_pressItems.slice(0, 4))
    } else {
      setNewItems(_newsItems.slice(0, 6))
      setPressItems(_pressItems.slice(0, 6))
    }
  }

  const handleClickMore = categoryId => {
    router.push({ pathname: '/news/categories', query: { category_id: categoryId } })
  }

  const handleClickDate = id => {
    router.push({ pathname: '/news/detail', query: { id: id } })
  }

  return (
    <>
      {newsInfo.length > 0 ? (
        viewport === 'mobile' ? (
          <div className={styles.m_container + ' p-4 pb-10'}>
            <div className="text-left mt-5 w-full">
              <div className={styles.m_newTopTitle}>News</div>
              <div className={styles.m_newTopDash + ' mt-2'} />
            </div>
            <div className="w-full">
              {newsItems.length > 0 ? (
                <>
                  <div className={styles.m_categoryTitle + ' mt-9 mb-6'}>Novedades CrysDyaz & Co</div>
                  <div className={'grid grid-cols-2 gap-3 flex justify-center'}>
                    {newsItems.map((item, index) => (
                      <MobileNewsCard item={item} key={index} handleClickDate={handleClickDate} />
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <div
                      className={
                        styles.moreContainer + ' mt-6 mb-4 flex justify-center items-center cursor-pointer w-fit'
                      }
                      onClick={() => handleClickMore(1)}
                    >
                      <div className={styles.m_seeAll + ' mr-5'}>Ver todas</div>
                      <Image src={ArrowRightGray} alt="" width={10} height={8} />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full">
              {pressItems.length > 0 ? (
                <>
                  <div className={styles.m_categoryTitle + ' mt-9 mb-6'}>Apariciones en prensa</div>
                  <div className={'grid grid-cols-2 gap-4 flex justify-center'}>
                    {pressItems.map((item, index) => (
                      <MobileNewsCard item={item} key={index} handleClickDate={handleClickDate} />
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <div
                      className={
                        styles.moreContainer + ' mt-6 mb-4 flex justify-center items-center cursor-pointer w-fit'
                      }
                      onClick={() => handleClickMore(2)}
                    >
                      <div className={styles.m_seeAll + ' mr-5'}>Ver todas</div>
                      <Image src={ArrowRightGray} alt="" width={10} height={8} />
                    </div>
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
                          onClick={() => handleClickMore(1)}
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
                          onClick={() => handleClickMore(2)}
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
        )
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
