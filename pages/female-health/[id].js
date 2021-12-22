import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom component
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import CircularMark from 'components/components/CircularMark'
import CarouselFemaleHealth from 'components/FemaleHealth/CarouselFemaleHealth'
import BuyOutlineButton from 'components/components/BuyOutlineButton'
import OutlineButton from 'components/components/OutlineButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/female-health/id.module.scss'

// json data
import { useRouter } from 'next/router'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Menopause = () => {
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
  const router = useRouter()
  const [readMoreCurrentState, setReadMoreCurrentState] = useState('less')
  const [disciplineID, setDisciplineID] = useState(null)

  const [femHealthService, setFemHealthService] = useState({})
  const [text, setText] = useState('')
  const [
    getFemHealthService,
    { data: femHealthServiceData, loading: femHealthServiceLoading, error: femHealthServiceError },
  ] = useLazyQuery(graphql.queries.getFemHealthService)
  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop

  // handlers
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setViewport('desktop')
    } else if (window.innerWidth === 1024) {
      setViewport('ipad')
    } else {
      setViewport('mobile')
    }
  }, [])

  useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 1024) {
        setViewport('desktop')
      } else if (window.innerWidth === 1024) {
        setViewport('ipad')
      } else {
        setViewport('mobile')
      }
    }
    window.addEventListener('resize', resizeFunction)
  }, [])

  useEffect(() => {
    dispatch({ type: 'set', isLoading: false })
    setDisciplineID(Number(router.asPath.split('/')[2]))
  }, [dispatch, router])

  useEffect(() => {
    if (disciplineID) {
      getFemHealthService({ variables: { discipline_id: disciplineID } })
    }
  }, [disciplineID, setDisciplineID])

  useEffect(() => {
    if (!femHealthServiceError && femHealthServiceData && femHealthServiceData.getFemHealthService) {
      setFemHealthService(femHealthServiceData.getFemHealthService)
    }
  }, [femHealthServiceLoading, femHealthServiceData, femHealthServiceError])

  useEffect(() => {
    if (femHealthService.text !== undefined) {
      let str = femHealthService.text.replace(/<\/?[^>]+(>|$)/g, '')
      setText(str)
    }
  }, [femHealthService])

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={'w-full flex flex-wrap justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.backButtonArea}>
          <BackButton />
        </div>
        {JSON.stringify(femHealthService) !== JSON.stringify({}) ? (
          <div className={'grid grid-cols-12 gap-4'} style={{ minHeight: '634px' }}>
            <div className={viewport === 'mobile' ? 'col-span-12 block' : 'col-span-5 block'}>
              <div className={styles.strokeTitle}>{femHealthService.title_one}</div>
              <div className={styles.pinkTitle}>{femHealthService.title_two}</div>
              <div className={styles.divider} />
              <div className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}>
                <div className={globalStyles.tinyMCEClass}>
                  <div id="text" className={'tinymce-class'} dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                {text.length > 550 ? (
                  <ReadMoreButton currentState={readMoreCurrentState} onClick={state => handleReadMore(state)} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* buy button part start */}
            {viewport === 'mobile' ? (
              <div className={'col-span-12'}>
                {femHealthService.stream_button ? (
                  <div className="my-1">
                    <BuyOutlineButton
                      title="Compra 1 to 1 en streaming"
                      link="/buy/buy-one-to-one"
                      onClick={link =>
                        router.push({
                          pathname: link,
                          query: {
                            discipline_id: femHealthService.discipline_id,
                            service_type: 'streaming',
                            type: 'femHealth',
                            image:
                              femHealthService?.carousel_image.length > 0
                                ? femHealthService?.carousel_image[0].path
                                : '',
                          },
                        })
                      }
                    />
                  </div>
                ) : (
                  <></>
                )}
                {femHealthService.personal_button ? (
                  <div className="my-1">
                    <BuyOutlineButton
                      title="Compra presenciales"
                      link="/buy/buy-person"
                      onClick={link =>
                        router.push({
                          pathname: link,
                          query: {
                            discipline_id: femHealthService.discipline_id,
                            service_type: 'personal',
                            type: 'femHealth',
                            image:
                              femHealthService?.carousel_image.length > 0
                                ? femHealthService?.carousel_image[0].path
                                : '',
                          },
                        })
                      }
                    />
                  </div>
                ) : (
                  <></>
                )}
                {femHealthService.online_button ? (
                  <div className="my-1">
                    <BuyOutlineButton
                      title="Compra planes online"
                      link="/buy/buy-plans-online"
                      onClick={link =>
                        router.push({
                          pathname: link,
                          query: {
                            discipline_id: femHealthService.discipline_id,
                            service_type: 'online',
                            type: 'femHealth',
                            image:
                              femHealthService?.carousel_image.length > 0
                                ? femHealthService?.carousel_image[0].path
                                : '',
                          },
                        })
                      }
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {/* buy button part end */}
            <div
              className={
                viewport === 'mobile'
                  ? 'col-span-12 relative flex justify-center'
                  : 'col-span-7 relative flex justify-end'
              }
            >
              {viewport === 'mobile' ? (
                <></>
              ) : (
                <div className={'absolute top-10 z-10'}>
                  <CircularMark />
                </div>
              )}
              <div className={viewport === 'mobile' ? 'w-full mt-3 pb-7' : 'w-full mt-20 pb-20'}>
                {femHealthService?.carousel_image !== undefined ? (
                  <CarouselFemaleHealth sliderData={femHealthService?.carousel_image} viewport={viewport} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={'w-full justify-center items-center text-center p-32 text-7xl'}>No Data</div>
        )}
      </div>
      {/* Button group part */}
      {viewport !== 'mobile' ? (
        <div className={'w-full ' + (viewport === 'mobile' ? '' : 'pt-32')}>
          <div className={'w-full flex'}>
            {femHealthService.stream_button ? (
              <div className={'w-1/3'}>
                <OutlineButton
                  title="Compra 1 to 1 en streaming"
                  link="/buy/buy-one-to-one"
                  onClick={link =>
                    router.push({
                      pathname: link,
                      query: {
                        discipline_id: femHealthService.discipline_id,
                        service_type: 'streaming',
                        type: 'femHealth',
                        image:
                          femHealthService?.carousel_image.length > 0 ? femHealthService?.carousel_image[0].path : '',
                      },
                    })
                  }
                />
              </div>
            ) : (
              <></>
            )}
            {femHealthService.personal_button ? (
              <div className={'w-1/3'}>
                <OutlineButton
                  title="Compra presenciales"
                  link="/buy/buy-person"
                  onClick={link =>
                    router.push({
                      pathname: link,
                      query: {
                        discipline_id: femHealthService.discipline_id,
                        service_type: 'personal',
                        type: 'femHealth',
                        image:
                          femHealthService?.carousel_image.length > 0 ? femHealthService?.carousel_image[0].path : '',
                      },
                    })
                  }
                />
              </div>
            ) : (
              <></>
            )}
            {femHealthService.online_button ? (
              <div className={'w-1/3'}>
                <OutlineButton
                  title="Compra planes online"
                  link="/buy/buy-plans-online"
                  onClick={link =>
                    router.push({
                      pathname: link,
                      query: {
                        discipline_id: femHealthService.discipline_id,
                        service_type: 'online',
                        type: 'femHealth',
                        image:
                          femHealthService?.carousel_image.length > 0 ? femHealthService?.carousel_image[0].path : '',
                      },
                    })
                  }
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
export default Menopause

Menopause.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
