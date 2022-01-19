import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'

// third party components
import moment from 'moment'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

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
  const { data, viewport } = props
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

  return (
    <div className={'w-full'}>
      <div className={'flex justify-evenly items-center mb-4 ' + styles.tableHead}>
        <div className={styles.viewArea + ' ' + styles.tableHeadTitle}>VISTA</div>
        <div className={styles.dayArea + ' ' + styles.tableHeadTitle}>FECHA</div>
        <div className={'flex flex-1 ' + styles.tableHeadTitle}>NOMBRE</div>
      </div>
      <div style={{ height: 'calc(100vh - 300px)' }}>
        <PerfectScrollbar>
          {academy !== undefined &&
            academy.map((item, index) => (
              <div key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
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
                  <div className={'flex justify-start items-center'}>
                    <div className={styles.viewArea}></div>
                    <div className={styles.dayArea + ' ' + styles.contentFecha}>
                      <div className={styles.onlineText}>ONLINE</div>
                      <div className={styles.hourText}>{moment(item.hour).format('HH:MM')}</div>
                    </div>
                    <div className={'flex flex-1 flex-wrap ' + styles.tableHeadTitle}>
                      <div className={'w-full ' + globalStyles.tinyMCEClass}>
                        <div
                          className={styles.description + ' tinymce-class'}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
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
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default AcademyTable
