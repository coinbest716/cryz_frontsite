import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// third party components
import moment from 'moment'
import ReactPlayer from 'react-player'

// custom components
import DocumentButton from './DocumentButton'

// images
import plus from 'public/images/plus-gray.svg'
import minus from 'public/images/minus-gray.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './AcademyTable.module.scss'

const AcademyTable = props => {
  // variables
  const { academyID, data, category, viewport } = props
  const router = useRouter()
  const [academy, setAcademy] = useState([])

  // handlers
  useEffect(() => {
    let _data = data
    let result = _data.map(function (el) {
      let obj = Object.assign({}, el)
      obj.collapse = true
      return obj
    })
    setAcademy(result)
  }, [data])

  const handleClickDocument = fileUrl => {
    let fileName = fileUrl.includes('amazonaws') ? fileUrl.split('_')[1] : fileUrl
    var a = document.createElement('a')
    a.href = fileUrl
    a.setAttribute('download', fileName)
    a.click()
  }

  const handleClickCollpase = index => {
    let _academy = [...academy]
    _academy[index].collapse = !_academy[index].collapse
    setAcademy(_academy)
  }

  const handleGotoOnlineStreaming = trainingID => {
    router.push({
      pathname: '/dashboard/live-streaming',
      query: { id: 'academy-' + academyID + '-' + trainingID, type: 'academy' },
    })
  }

  return viewport !== 'mobile' ? (
    <div className={'w-full'}>
      <div className={'flex justify-evenly items-center mb-4 ' + styles.tableHead}>
        <div className={styles.viewArea + ' ' + styles.tableHeadTitle}>VISTA</div>
        <div className={styles.dayArea + ' ' + styles.tableHeadTitle}>FECHA</div>
        <div className={'flex flex-1 ' + styles.tableHeadTitle}>NOMBRE</div>
      </div>
      {academy !== undefined &&
        academy.map((item, index) => (
          <div key={index} className={index % 2 === 1 ? 'bg-white' : 'bg-gray-100'}>
            <div className={'flex justify-start items-center ' + styles.tableContentHeadArea}>
              <div
                className={
                  'cursor-pointer flex justify-center items-center ' + styles.viewArea + ' ' + styles.contentTitle
                }
                onClick={() => handleClickCollpase(index)}
              >
                {item.collapse ? (
                  <Image src={plus} alt={''} width={15} height={15} />
                ) : (
                  <Image src={minus} alt={''} width={15} height={15} />
                )}
              </div>
              <div className={styles.dayArea + ' ' + styles.contentFecha}>{moment(item.day).format('DD/MM')}</div>
              <div className={'flex flex-1 ' + styles.contentTitle}>{item.title}</div>
            </div>
            {item.collapse ? (
              <></>
            ) : (
              <div className={'flex justify-start'}>
                <div className={styles.viewArea}></div>
                <div className={styles.dayArea + ' ' + styles.contentFecha}>
                  {item.stream_event !== undefined && item.stream_event === true && (
                    <div className={styles.onlineText} onClick={() => handleGotoOnlineStreaming(item.id)}>
                      {category.toUpperCase()}
                    </div>
                  )}

                  {item.stream_event !== undefined && item.stream_event === false && (
                    <div className={styles.onlineText}>PRESENCIAL</div>
                  )}

                  {category !== 'video' && <div className={styles.hourText}>{moment(item.hour).format('HH:mm')}h</div>}
                </div>
                <div className={'flex flex-1 flex-wrap ' + styles.tableHeadTitle}>
                  <div className={'w-full ' + globalStyles.tinyMCEClass}>
                    <div
                      className={styles.description + ' tinymce-class'}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                  <div className="w-full my-4">
                    {category === 'video' && item.video_url !== undefined && (
                      <ReactPlayer
                        url={item.video_url}
                        width="100%"
                        height="100%"
                        controls={true}
                        loop={true}
                        muted={true}
                        playing={true}
                      />
                    )}
                  </div>
                  {item.doc !== null && (
                    <div className="m-2">
                      <DocumentButton doc={item.doc} onClickDownload={handleClickDocument} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  ) : (
    <div className={'w-full'}>
      <div className={'flex justify-between items-center ' + styles.mobileTableHead}>
        <div className={styles.mobileDayArea + ' ' + styles.mobileTableHeadTitle}>FECHA</div>
        <div className={'flex flex-1 justify-center ' + styles.mobileTableHeadTitle}>NOMBRE</div>
        <div className={styles.mobileViewArea + ' ' + styles.mobileTableHeadTitle}>VISTA</div>
      </div>
      {academy !== undefined &&
        academy.map((item, index) => (
          <div key={index} className={'bg-gray-100'}>
            <div className={'flex justify-start items-center mb-3'}>
              <div className={styles.mobileDayArea + ' ' + styles.mobileContentFecha}>
                {moment(item.day).format('DD/MM')}
                <div className={styles.mobileHourText}>{moment(item.hour).format('HH:mm')}h</div>
              </div>
              <div className={'flex flex-1 justify-center ' + styles.mobileContentTitle}>{item.title}</div>
              <div
                className={
                  'cursor-pointer flex justify-center items-center ' +
                  styles.mobileViewArea +
                  ' ' +
                  styles.mobileContentTitle
                }
                onClick={() => handleClickCollpase(index)}
              >
                {item.collapse ? (
                  <Image src={plus} alt={''} width={15} height={15} />
                ) : (
                  <Image src={minus} alt={''} width={15} height={15} />
                )}
              </div>
            </div>
            {item.collapse ? (
              <></>
            ) : (
              <div className={'flex justify-start i '}>
                <div className={'flex flex-1 flex-wrap ' + styles.mobileTableContent}>
                  {item.stream_event !== undefined && item.stream_event === true && (
                    <div
                      className={'w-full flex justify-center ' + styles.onlineText}
                      onClick={() => handleGotoOnlineStreaming(item.id)}
                    >
                      {category.toUpperCase()}
                    </div>
                  )}
                  {item.stream_event !== undefined && item.stream_event === false && (
                    <div className={'w-full flex justify-center ' + styles.onlineText}>PRESENCIAL</div>
                  )}
                  <div
                    className={styles.description + ' tinymce-class'}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <div className="w-full my-4">
                    {category === 'video' && item.video_url !== undefined && (
                      <ReactPlayer
                        url={item.video_url}
                        width="100%"
                        height="100%"
                        controls={true}
                        loop={true}
                        muted={true}
                        playing={true}
                      />
                    )}
                  </div>
                  {item.doc !== null && (
                    <div className="flex justify-center">
                      <div className="m-2">
                        <DocumentButton doc={item.doc} onClickDownload={handleClickDocument} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default AcademyTable
