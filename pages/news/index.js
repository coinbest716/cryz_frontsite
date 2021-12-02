import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/news/news.module.scss'

// images
import news from 'public/images/news.svg'

const News = () => {
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

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' pt-20'}>
          <div className={'h-full'}>
            <div className={'h-1/3 flex items-center'}>
              <div>
                <div className={styles.topTitle}>PROXIMAMENTE…</div>
                <div className={styles.topDash + ' mt-4'} />
              </div>
            </div>
            <div className={'h-1/3 flex items-center justify-center'}>
              <div>
                <Image src={news} alt="" />
                <div className={styles.description}>
                  Un espacio exclusivo donde poder consultar todas las novedades y ultimas <br /> publicaciones de Crys
                  & Co
                </div>
              </div>
            </div>
            <div className={'h-1/3'}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default News

News.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
