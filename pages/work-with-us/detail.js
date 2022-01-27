import React, { createRef, useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import WorkWithUsText from 'components/workwithus/WorkWithUsText'
import WorkWithUsButton from 'components/workwithus/WorkWithUsButton'

import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

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
  const [mainInfo, setMainInfo] = useState({})

  // handlers
  const handleChangePersonal = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  useEffect(() => {
    setMainInfo(mockupData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
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
          <div className={styles.contentContainer + ' mt-16 px-7 py-12'}>
            <div className={styles.withTitle + ' mb-12'}>{mainInfo.title}</div>
            <div className={styles.withContent}>{mainInfo.content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

Detail.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
