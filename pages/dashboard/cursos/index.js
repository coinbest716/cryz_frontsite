import React, { useEffect, useState } from 'react'

// third party components
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './cursos.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'
import DownloadIcon from 'assets/images/download.svg'
import DownloadDisableIcon from 'assets/images/download-disable.svg'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Cursos = () => {
  // loading part ###########################

  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Cursos</div>

        <div className={styles.tableCellText}>
          {/* year select part */}
          <div className={styles.yearArea}></div>
          {/* table part */}
          <div className={'inline-grid'}>
            
          </div>
        </div>
      </div>
      <div>
        <PerfectScrollbar>
          <table className={'w-full table-auto'}>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>DETALLE</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>VER</div>
                </th>
              </tr>
            </thead>
            <tbody className={'mt-4 ' + styles.tbody}>
              <tr className={1 % 2 === 1 ? 'bg-white' : ''}>
                <td className={'h-full relative'}>
                  <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                    Curso básico de entrenamiento durante el embarazo
                  </div>
                </td>
                <td className={'h-full relative'}>
                  <div className={styles.tableContentArea}>
                    <a href='http://localhost:3000/dashboard/cursos/index'><Image src={FileViewIcon} alt={''} width={29} height={29} /></a>
                  </div>
                </td>
              </tr>
              <tr className={1 % 2 === 1 ? '' : ''}>
                <td className={'h-full relative'}>
                  <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                  Curso de preparación física y corporal al parto
                  </div>
                </td>
                <td className={'h-full relative'}>
                  <div className={styles.tableContentArea}>
                  <a href='http://localhost:3000/dashboard/cursos/id/index'><Image src={FileViewIcon} alt={''} width={29} height={29} /></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PerfectScrollbar>
      </div>
    </div>
  )
}
export default Cursos

Cursos.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
