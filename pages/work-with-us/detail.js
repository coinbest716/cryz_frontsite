import React, { createRef, useEffect, useState } from 'react'

// redux
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import WorkWithUsText from 'components/workwithus/WorkWithUsText'
import WorkWithUsButton from 'components/workwithus/WorkWithUsButton'
import MobileWorkWithUsText from 'components/workwithus/MobileWorkWithUsText'

import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

import backBlackIcon from 'assets/images/arrow-left-black.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './detail.module.scss'

const Detail = props => {
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
  const [sendCV] = useMutation(graphql.mutations.SendCV)
  const [getJobByIdForDashboard, { data: withData, loading: withLoading, error: withError }] = useLazyQuery(
    graphql.queries.getJobByIdForDashboard
  )
  const mockupData = {
    id: 5,
    title: 'Nutricionista deportivo y entrenador personal',
    description:
      'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.agittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.',
    content:
      'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.agittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.',
  }
  const { viewport } = props
  const fileRef = createRef()
  const [attachedFile, setAttachedFile] = useState({})
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    body: '',
    url: '',
  })
  const [mainInfo, setMainInfo] = useState(null)

  // handlers
  const handleChangePersonal = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  useEffect(() => {
    if (router.query.id) {
      getJobByIdForDashboard({ variables: { id: Number(router.query.id) } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    dispatch({ type: 'set', isLoading: withLoading })
    if (!withError && withData && withData.getJobByIdForDashboard) {
      setMainInfo(withData.getJobByIdForDashboard)
    }
  }, [withLoading, withData, withError])

  const handleClickCV = () => {
    if (
      !personalInfo.email ||
      !personalInfo.name ||
      !personalInfo.surname ||
      !personalInfo.body ||
      !personalInfo.phone ||
      !attachedFile
    ) {
      toast.error('todos los campos son obligatorios')
      return
    }
    dispatch({ type: 'set', isLoading: true })
    sendCV({
      variables: {
        email: personalInfo.email,
        firstName: personalInfo.name,
        lastName: personalInfo.surname,
        body: personalInfo.body,
        phone: personalInfo.phone,
        attachment: fileRef.current.files[0],
      },
    })
      .then(response => {
        if (response.data.sendCV) {
          router.push(`/work-with-us/confirm`)
          toast.success('Successfully register!')
          dispatch({ type: 'set', isLoading: false })
        }
      })
      .catch(error => {
        dispatch({ type: 'set', isLoading: false })
        toast.error(error.message)
      })
  }

  const onClickAttachFile = () => {
    fileRef.current.click()
  }

  const handleAttachFile = event => {
    const file = event.target.files[0]
    if (file) {
      setAttachedFile(file)
      setPersonalInfo({ ...personalInfo, url: file.name })
    }
  }

  const handleClickRegister = () => {
    router.push(
      {
        pathname: '/work-with-us/detail',
        query: {
          id: router.query.id,
          type: 'register',
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleClickMobileBack = () => {
    router.push(
      {
        pathname: '/work-with-us/detail',
        query: {
          id: router.query.id,
          type: 'main',
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleClickBack = () => {
    router.push('/work-with-us')
  }

  const handleClick = () => {
    console.log('++++++++++++++++++')
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>
          {router.query.type === 'register' ? (
            <div className="w-full p-4 mb-5">
              <div className="flex justify-start items-center w-fit" onClick={handleClickMobileBack}>
                <Image src={backBlackIcon} alt="" width={15} height={10} />
                <p className={styles.backToMain + ' ml-2'}>Trabaja con nosotros</p>
              </div>
              <div className="text-left mt-3 w-full">
                <div className={styles.m_topTitle}>Inscribirse</div>
                <div className={styles.m_topDash + ' mt-2'} />
              </div>
              <div className={styles.m_textContainer + ' mt-6'}>
                Estás mas cerca de formar parte de la familia de CrysDyaz&Co, rellena este formulario y adjunta tu CV..
              </div>
              <div className="mt-8">
                <div className={'pt-1 py-3'}>
                  <MobileWorkWithUsText
                    handleChange={e => handleChangePersonal(e, 'name')}
                    label={'Nombre'}
                    placeholder={''}
                    type={'text'}
                    value={personalInfo.name}
                  />
                </div>
                <div className={'pt-1 py-3'}>
                  <MobileWorkWithUsText
                    handleChange={e => handleChangePersonal(e, 'surname')}
                    label={'Apellidos'}
                    placeholder={''}
                    type={'text'}
                    value={personalInfo.surname}
                  />
                </div>
                <div className={'pt-1 py-3'}>
                  <MobileWorkWithUsText
                    handleChange={e => handleChangePersonal(e, 'email')}
                    label={'Email'}
                    placeholder={''}
                    type={'text'}
                    value={personalInfo.email}
                  />
                </div>
                <div className={'pt-1 py-3'}>
                  <MobileWorkWithUsText
                    handleChange={e => handleChangePersonal(e, 'phone')}
                    label={'Teléfono'}
                    placeholder={''}
                    type={'text'}
                    value={personalInfo.phone}
                  />
                </div>
                <div className={'pt-1 py-3'}>
                  <MobileWorkWithUsText
                    handleChange={e => handleChangePersonal(e, 'body')}
                    label={'Porqué quiero trabajar en Crys Dyaz & Co'}
                    placeholder={''}
                    type={'textarea'}
                    value={personalInfo.body}
                  />
                </div>
              </div>
              <div>
                <WorkWithUsButton
                  label={'Adjuntar pdf'}
                  type={'pdf'}
                  viewport={viewport}
                  fileRef={fileRef}
                  onClickAttachFile={onClickAttachFile}
                  handleAttachFile={handleAttachFile}
                />

                <p className={styles.filePath + ' ml-8 mt-1'}>{personalInfo.url}</p>
              </div>
              <div className="flex justify-center mt-7">
                <WorkWithUsButton label={'ENVIAR CV'} handleClick={handleClickCV} type={'cv'} viewport={viewport} />
              </div>
            </div>
          ) : (
            <div className="w-full p-4 my-5">
              <div onClick={handleClickBack}>
                <Image src={backBlackIcon} alt="" width={20} height={15} />
              </div>
              {mainInfo && (
                <div className={styles.contentContainer + ' mt-5 mb-7 px-4 py-7'}>
                  <div className={styles.m_withTitle + ' mb-6'}>{mainInfo.title}</div>
                  <div className={styles.m_withContent}>{mainInfo.content}</div>
                </div>
              )}
              <div className={styles.register + ' mt-5'} onClick={handleClickRegister}>
                <p className={styles.m_registerText}>INSCRIBIRSE</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' my-20'}>
              <div className={'mt-9'}>
                <BackButton viewport={viewport} />
              </div>
              <div className="flex flex-wrap justify-between mt-10">
                <div>
                  <div className={styles.topTitle}>Inscribirse</div>
                  <div className={styles.topDash + ' mt-5 mb-6'} />
                  <div className={styles.shortText}>
                    Estás mas cerca de formar parte de la familia de CrysDyaz&Co, rellena este <br />
                    formulario y adjunta tu CV..
                  </div>
                </div>
                <CircularMark />
              </div>
              <div className="mt-5 w-3/4">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="w-6/12">
                    <WorkWithUsText
                      handleChange={e => handleChangePersonal(e, 'name')}
                      label={'Nombre'}
                      placeholder={''}
                      type={'text'}
                      value={personalInfo.name}
                    />
                  </div>
                  <div className="w-4/12">
                    <WorkWithUsText
                      handleChange={e => handleChangePersonal(e, 'phone')}
                      label={'Teléfono'}
                      placeholder={''}
                      type={'text'}
                      value={personalInfo.phone}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between items-center mt-5">
                  <div className="w-6/12">
                    <WorkWithUsText
                      handleChange={e => handleChangePersonal(e, 'surname')}
                      label={'Apellidos'}
                      placeholder={''}
                      type={'text'}
                      value={personalInfo.surname}
                    />
                  </div>
                  <div className="w-4/12">
                    <WorkWithUsText
                      handleChange={e => handleChangePersonal(e, 'email')}
                      label={'Email'}
                      placeholder={''}
                      type={'text'}
                      value={personalInfo.email}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between mt-5">
                  <div className="w-6/12">
                    <WorkWithUsText
                      handleChange={e => handleChangePersonal(e, 'body')}
                      label={'Porqué quiero trabajar en Crys Dyaz & Co'}
                      placeholder={''}
                      type={'textarea'}
                      value={personalInfo.body}
                    />
                  </div>
                  <div className="w-4/12 flex justify-start" style={{ marginTop: '26px' }}>
                    <WorkWithUsText
                      handleChange={e => handleChangePersonal(e, 'url')}
                      label={''}
                      placeholder={''}
                      type={'text'}
                      value={personalInfo.url}
                      disabled={true}
                    />
                    <div>
                      <WorkWithUsButton
                        label={'Adjuntar pdf'}
                        type={'pdf'}
                        fileRef={fileRef}
                        onClickAttachFile={onClickAttachFile}
                        handleAttachFile={handleAttachFile}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <WorkWithUsButton label={'ENVIAR CV'} handleClick={handleClickCV} type={'cv'} />
                </div>
              </div>
              {mainInfo && (
                <div className={styles.contentContainer + ' mt-16 px-7 py-12'}>
                  <div className={styles.withTitle + ' mb-12'}>{mainInfo.title}</div>
                  <div className={styles.withContent}>{mainInfo.content}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Detail

Detail.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
