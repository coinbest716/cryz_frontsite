import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'

// third party components
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// custom components
import Radio from 'components/components/Radio'

// images and icons
import CloseIcon from 'assets/images/close.svg'
import CloseGrayIcon from 'assets/images/close-gray.svg'

// styles
import styles from './Questionnaire.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import { introspectionFromSchema } from 'graphql'

const Questionnaire = props => {
  // variables
  const { onClick, viewport } = props
  const [questionnaireData, setQuestionnaireData] = useState([])

  const [
    getPendingQuestionnaireByDashboard,
    { data: pendingQuestionnaireData, loading: pendingQuestionnaireLoading, error: pendingQuestionnaireError },
  ] = useLazyQuery(graphql.queries.getPendingQuestionnaireByDashboard)

  // handlers
  useEffect(() => {
    getPendingQuestionnaireByDashboard()
  }, [getPendingQuestionnaireByDashboard])

  useEffect(() => {
    if (
      !pendingQuestionnaireError &&
      pendingQuestionnaireData &&
      pendingQuestionnaireData.getPendingQuestionnaireByDashboard
    ) {
      setQuestionnaireData(pendingQuestionnaireData.getPendingQuestionnaireByDashboard[0].questionnaire)
    }
  }, [pendingQuestionnaireLoading, pendingQuestionnaireData, pendingQuestionnaireError])

  //
  const handleChangeInput = (event, idx) => {
    let array = questionnaireData
    let tempArray = []
    array.map((item, index) => {
      if (index === idx) {
        let object = JSON.parse(JSON.stringify(array[index]))
        object.answer = event.target.value
        tempArray.push(object)
      } else {
        tempArray.push(array[index])
      }
    })
    setQuestionnaireData(tempArray)
  }

  const handleChangeRadio = (value, idx) => {
    let array = questionnaireData
    let tempArray = []
    array.map((item, index) => {
      if (index === idx) {
        let object = JSON.parse(JSON.stringify(array[index]))
        object.answer = value
        tempArray.push(object)
      } else {
        tempArray.push(array[index])
      }
    })
    setQuestionnaireData(tempArray)
  }

  return (
    <div className={styles.card}>
      <div className={styles.closeButton}>
        <button
          className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
          onClick={() => onClick()}
        >
          <Image
            src={viewport === 'mobile' ? CloseGrayIcon : CloseIcon}
            alt="..."
            width={viewport === 'mobile' ? 16 : 30}
            height={viewport === 'mobile' ? 16 : 30}
          />
        </button>
      </div>
      <div className={styles.title}>Rellena el cuestionario</div>
      <div className={styles.underline}></div>
      <div className={styles.scrollbarArea}>
        <PerfectScrollbar>
          {questionnaireData.length !== 0 &&
            questionnaireData.map((item, index) => (
              <div key={index}>
                <div className={'mt-5 ' + styles.subTitle}>{item.name}</div>
                {item.type === 'text' && (
                  <div className="ml-3">
                    <div className={styles.text + ' mt-5'}>UNA RESPUESTA</div>
                    <div className="mt-5">
                      <input
                        placeholder="Padezco de…"
                        className={styles.inputArea}
                        value={item.answer}
                        onChange={event => handleChangeInput(event, index)}
                      />
                    </div>
                  </div>
                )}
                {item.type === 'bool' && (
                  <div className="ml-3">
                    <div className={styles.text + ' mt-5'}>UNA RESPUESTA</div>
                    <div className="mt-5">
                      <Radio
                        name={'group' + index}
                        value={true}
                        label={'Verdadera'}
                        handleChangeType={() => handleChangeRadio(true, index)}
                      />
                    </div>
                    <div className="mt-5">
                      <Radio
                        name={'group' + index}
                        value={false}
                        label={'Falsa'}
                        handleChangeType={() => handleChangeRadio(false, index)}
                      />
                    </div>
                  </div>
                )}
                {item.type === 'radio' && (
                  <div className="ml-3">
                    <div className={styles.text + ' mt-5'} style={{ marginTop: '21px' }}>
                      MÚLTIPLES RESPUESTAS
                    </div>
                    {item.choices.map((elem, idx) => (
                      <div className="mt-5">
                        <Radio
                          name={'group' + index}
                          value={elem}
                          label={elem}
                          handleChangeType={() => handleChangeRadio(elem, index)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </PerfectScrollbar>
      </div>
      <div className="flex justify-center mt-20 lg:mt-24 lg:mr-16">
        <button className={'flex justify-center items-center ' + styles.outlineButton} onClick={() => {}}>
          ENVIAR
        </button>
      </div>
    </div>
  )
}

export default Questionnaire
