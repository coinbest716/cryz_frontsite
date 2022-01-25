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
import MobileNewsCard from 'components/news/MobileNewsCard'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
// styles

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './categories.module.scss'

import ReactPaginate from 'react-paginate'

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
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = viewport === 'mobile' ? 8 : 12

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

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(newsInfo.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(newsInfo.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, newsInfo])

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % newsInfo.length
    setItemOffset(newOffset)
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container + ' p-4 pb-10'}>
          <div className="w-full">
            <div className={'mt-5'}>
              <BackButton viewport={viewport} />
            </div>
            <div className="text-left mt-5 w-full">
              <div className={styles.m_newTopTitle}>News</div>
              <div className={styles.m_newTopDash + ' mt-2'} />
            </div>
            <div>
              {currentItems?.length > 0 ? (
                <>
                  <div className={styles.m_categoryTitle + ' mt-5 mb-5'}>
                    {categoryId === 1 ? 'Novedades CrysDyaz & Co' : 'Apariciones en prensa'}
                  </div>
                  <div className={'grid grid-cols-2 gap-4 flex justify-center'}>
                    {currentItems.map((item, index) => (
                      <MobileNewsCard item={item} key={index} handleClickDate={handleClickDate} />
                    ))}
                  </div>
                  <div className={'paginationWrapper mt-10'}>
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="<"
                      renderOnZeroPageCount={null}
                      breakClassName={'page-item'}
                      breakLinkClassName={'page-link'}
                      containerClassName={'pagination'}
                      pageClassName={'page-item'}
                      pageLinkClassName={'page-link'}
                      previousClassName={'page-item'}
                      previousLinkClassName={'page-link'}
                      nextClassName={'next-button'}
                      nextLinkClassName={'page-link'}
                      activeClassName={'active'}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
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
                {currentItems?.length > 0 ? (
                  <>
                    <div className={styles.categoryTitle + ' mb-9'}>
                      {categoryId === 1 ? 'Novedades CrysDyaz & Co' : 'Apariciones en prensa'}
                    </div>
                    <div
                      className={
                        'grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:sm:grid-cols-1 gap-8 flex justify-center'
                      }
                    >
                      {currentItems.map((item, index) => (
                        <NewsCard item={item} key={index} handleClickDate={handleClickDate} />
                      ))}
                    </div>
                    <div className={'paginationWrapper mt-10'}>
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'next-button'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                      />
                    </div>
                  </>
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
export default Categoris

Categoris.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
