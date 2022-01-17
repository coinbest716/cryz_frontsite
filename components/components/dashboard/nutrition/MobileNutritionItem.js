import React from 'react'
import Image from 'next/image'
import moment from 'moment'

import plus from 'public/images/plus-gray.svg'
import minus from 'public/images/minus-gray.svg'
import DocumentButton from './DocumentButton'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './MobileNutritionItem.module.scss'

const MobileNutritionItem = props => {
  const { item, index, handleClickCollpase, handleClickDocument } = props
  return (
    <div className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
      <div className={'flex justify-evenly items-center ' + styles.tableContentHeadArea}>
        <div className={'w-1/5 text-center p-3 ' + styles.contentTitle}>{moment(item.start_date).format('DD/MM')}</div>
        <div className={'w-3/5 text-center p-3 ' + styles.contentTitle}>{item.name}</div>
        <div
          className={'w-1/5 text-center p-3 cursor-pointer flex justify-center items-center ' + styles.contentTitle}
          onClick={() => handleClickCollpase(index)}
        >
          {item.collapse ? (
            <Image src={plus} alt={''} width={13} height={13} />
          ) : (
            <Image src={minus} alt={''} width={13} height={13} />
          )}
        </div>
      </div>
      {item.collapse ? (
        <></>
      ) : (
        <div className={'flex justify-evenly items-center ' + styles.tableContentArea}>
          <div className={'w-1/5 '}></div>
          <div className={'w-4/5 px-10 py-3'}>
            <div className={globalStyles.tinyMCEClass}>
              <div
                className={styles.description + ' tinymce-class'}
                dangerouslySetInnerHTML={{ __html: item.detail }}
              />
            </div>
            <div className="flex flex-wrap justify-center">
              {item.document?.map((doc, index) => (
                <div className="m-2" key={index}>
                  <DocumentButton doc={doc} onClickDownload={handleClickDocument} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNutritionItem
