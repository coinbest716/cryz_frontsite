import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'

// third party components
import toast from 'react-hot-toast'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// custom components
import Radio from 'components/components/Radio'
import Checkbox from 'components/components/Checkbox'

// images and icons
import CloseIcon from 'assets/images/close.svg'
import CloseGrayIcon from 'assets/images/close-gray.svg'

// styles
import styles from './Questionnaire.module.scss'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Questionnaire = props => {
  // variables
  const { onClick, viewport } = props
  const [questionnaireData, setQuestionnaireData] = useState({})

  const [
    getPendingQuestionnaireByDashboard,
    { data: pendingQuestionnaireData, loading: pendingQuestionnaireLoading, error: pendingQuestionnaireError },
  ] = useLazyQuery(graphql.queries.getPendingQuestionnaireByDashboard)

  const [UpdateCompletedQuestionnaireByDashboard] = useMutation(
    graphql.mutations.updateCompletedQuestionnaireByDashboard
  )

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
      if (pendingQuestionnaireData.getPendingQuestionnaireByDashboard.length !== 0) {
        setQuestionnaireData(pendingQuestionnaireData.getPendingQuestionnaireByDashboard[0])
      } else {
        setQuestionnaireData({})
      }
    }
  }, [pendingQuestionnaireLoading, pendingQuestionnaireData, pendingQuestionnaireError])

  //
  const handleChangeInput = (event, idx) => {
    let array = questionnaireData.questionnaire
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
    setQuestionnaireData({ ...questionnaireData, questionnaire: tempArray })
  }

  const handleChangeRadio = (value, idx) => {
    let array = questionnaireData.questionnaire
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
    setQuestionnaireData({ ...questionnaireData, questionnaire: tempArray })
  }

  const handleChangeCheckbox = (event, value, idx) => {
    let array = questionnaireData.questionnaire
    let tempArray = []
    array.map((item, index) => {
      if (index === idx) {
        let object = JSON.parse(JSON.stringify(array[index]))
        let count = 0
        if (event.target.checked === true) {
          object.answer.map((elem, idx) => {
            if (elem === value) {
              count++
            }
          })
          if (count === 0) {
            object.answer.push(value)
          }
        } else {
          let index = object.answer.indexOf(value)
          if (index > -1) {
            object.answer.splice(index, 1)
          }
        }
        tempArray.push(object)
      } else {
        tempArray.push(array[index])
      }
    })
    setQuestionnaireData({ ...questionnaireData, questionnaire: tempArray })
  }

  const handleCompletedQuestionnaire = () => {
    UpdateCompletedQuestionnaireByDashboard({
      variables: {
        id: questionnaireData.id,
        attachment: null,
        questionnaire: questionnaireData.questionnaire,
      },
    })
      .then(response => {
        if (response.data.updateCompletedQuestionnaireByDashboardId !== null) {
          toast.success('All questionnaires are submitted successfully.')
          onClick()
        } else {
          toast.error('Unknown Error! Please contact our support team.')
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
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
          {questionnaireData.questionnaire !== undefined &&
            questionnaireData.questionnaire.length !== 0 &&
            questionnaireData.questionnaire.map((item, index) => (
              <div key={index}>
                <div className={'mt-5 ' + styles.subTitle}>{item.name}</div>
                {item.type === 'text' && (
                  <div className="ml-3">
                    {/* <div className={styles.text + ' mt-5'}>UNA RESPUESTA</div> */}
                    <div className="mt-5">
                      <input
                        placeholder=""
                        className={styles.inputArea}
                        value={item.answer}
                        onChange={event => handleChangeInput(event, index)}
                      />
                    </div>
                  </div>
                )}
                {item.type === 'bool' && (
                  <div className="ml-3">
                    {/* <div className={styles.text + ' mt-5'}>UNA RESPUESTA</div> */}
                    <div className="mt-5">
                      <Radio
                        name={'group' + index}
                        value={true}
                        label={'Verdadera'}
                        answer={item.answer}
                        handleChangeType={() => handleChangeRadio(true, index)}
                      />
                    </div>
                    <div className="mt-5">
                      <Radio
                        name={'group' + index}
                        value={false}
                        label={'Falsa'}
                        answer={item.answer}
                        handleChangeType={() => handleChangeRadio(false, index)}
                      />
                    </div>
                  </div>
                )}
                {item.type === 'radio' && (
                  <div className="ml-3">
                    {/* <div className={styles.text + ' mt-5'}>MÚLTIPLES RESPUESTAS</div> */}
                    {item.choices.map((elem, idx) => (
                      <div className="mt-5" key={idx}>
                        <Radio
                          name={'group' + index}
                          value={elem}
                          label={elem}
                          answer={item.answer}
                          handleChangeType={() => handleChangeRadio(elem, index)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {item.type === 'check' && (
                  <div className="ml-3">
                    {/* <div className={styles.text + ' mt-5'}>MÚLTIPLES RESPUESTAS</div> */}
                    {item.choices.map((elem, idx) => (
                      <div className="mt-5" key={idx}>
                        <Checkbox
                          name={'group' + index}
                          value={elem}
                          label={elem}
                          answer={item.answer}
                          handleChangeCheckbox={event => handleChangeCheckbox(event, elem, index)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {item.type === 'section' && (
                  <div className="ml-3">{/* <div className={styles.text + ' mt-5'}>{item.name}</div> */}</div>
                )}
                {item.type === 'number' && (
                  <div className="ml-3">
                    {/* <div className={styles.text + ' mt-5'}>UNA RESPUESTAS</div> */}
                    <div className="mt-5">
                      <input
                        type="number"
                        placeholder=""
                        className={styles.inputArea}
                        value={item.answer}
                        onChange={event => handleChangeInput(event, index)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </PerfectScrollbar>
      </div>
      <div className="flex justify-center mt-20 lg:mt-24 lg:mr-16">
        <button
          className={'flex justify-center items-center ' + styles.outlineButton}
          onClick={() => handleCompletedQuestionnaire()}
        >
          ENVIAR
        </button>
      </div>
    </div>
  )
}

export default Questionnaire
