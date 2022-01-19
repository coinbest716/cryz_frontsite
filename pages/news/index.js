import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import NewsCard from 'components/components/news/NewsCard'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/news/news.module.scss'

// images
import news from 'public/images/news.svg'

const News = props => {
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

  const mockupData = [
    {
      image:
        'https://crysdiaz-public.s3.eu-west-1.amazonaws.com/attachment/ca1eaaac-9140-47a4-a580-290732e07834_1nutri.png',
      title: 'LOREM IPSUM LOREM IPSUM LOREM IPSUM',
      date: '2022-01-06T18:04:57.000Z',
      description:
        'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum',
    },
    {
      image:
        'https://crysdiaz-public.s3.eu-west-1.amazonaws.com/attachment/ca1eaaac-9140-47a4-a580-290732e07834_1nutri.png',
      title: 'LOREM IPSUM LOREM IPSUM LOREM IPSUM',
      date: '2022-01-06T18:04:57.000Z',
      description:
        'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum',
    },
    {
      image:
        'https://crysdiaz-public.s3.eu-west-1.amazonaws.com/attachment/ca1eaaac-9140-47a4-a580-290732e07834_1nutri.png',
      title: 'LOREM IPSUM LOREM IPSUM LOREM IPSUM',
      date: '2022-01-06T18:04:57.000Z',
      description:
        'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum',
    },
  ]

  // variables
  const { viewport } = props

  return (
    <>
      {mockupData.length > 0 ? (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' mx-20'}>
              <div className="flex justify-between mt-24">
                <div>
                  <div className={styles.newTopTitle}>News</div>
                  <div className={styles.newTopDash + ' mt-5'} />
                </div>
                <CircularMark />
              </div>
              <div>
                <div className={styles.categoryTitle + ' mb-9'}>Novedades CrysDyaz & Co</div>
                <div className={'grid grid-cols-12 gap-8'}>
                  {mockupData.map((item, index) => (
                    <div key={index} className={'col-span-4'}>
                      <NewsCard item={item} />
                    </div>
                  ))}
                </div>
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
