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
import styles from '../cursos.module.scss'

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
        <div className={globalStyles.dashTitle}>Curso básico de entrenamiento durante el embarazo</div>

        <div className={styles.tableCellText}>
          {/* year select part */}
          <div className={styles.yearArea}></div>
          {/* table part */}
          <div className={'inline-grid'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam felis ac odio fermentum scelerisque.
            Vestibulum tempor pretium turpis, eu ullamcorper erat. Sed fermentum magna felis, in posuere nulla ornare a.
            Etiam lobortis consequat libero eget rutrum. Fusce et pretium justo, et fringilla massa. Vestibulum molestie
            sollicitudin leo et volutpat. Suspendisse elementum sodales dolor ac luctus. Fusce dignissim justo sem, ut
            efficitur nibh sodales non. In feugiat mollis nunc, in cursus arcu tempus imperdiet. Cras mollis dui semper
            sagittis tempor. Phasellus rhoncus, velit eu eleifend gravida, nulla mauris molestie tortor, et feugiat ex
            turpis in lorem. Quisque imperdiet vulputate condimentum. Praesent laoreet tortor venenatis velit malesuada,
            non fringilla mi pulvinar. Etiam ut mattis leo. Etiam commodo id felis eget faucibus. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </div>
        </div>
      </div>
      {/* year select part */}
      <div className={styles.yearArea}></div>
      {/* table part */}
      <div>
        <PerfectScrollbar>
          <table className={'w-full table-auto'}>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>LECCIÓN</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>DETALLE</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>VIDEO</div>
                </th>
              </tr>
            </thead>
            <tbody className={'mt-4 ' + styles.tbody}>
              <tr className={1 % 2 === 1 ? 'bg-white' : ''}>
                <td className={'h-full relative'}>
                  <div
                    className={
                      'absolute top-0 bottom-0 flex flex-col justify-around ' +
                      styles.tableContentArea +
                      ' ' +
                      styles.tableCellText
                    }
                  >
                    <div className={'flex items-start'}>1</div>
                  </div>
                </td>
                <td>
                  <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                    <div className={'inline-grid'}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam felis ac odio fermentum
                      scelerisque. Vestibulum tempor pretium turpis, eu ullamcorper erat. Sed fermentum magna felis, in
                      posuere nulla ornare a. Etiam lobortis consequat libero eget rutrum. Fusce et pretium justo, et
                      fringilla massa. Vestibulum molestie sollicitudin leo et volutpat. Suspendisse elementum sodales
                      dolor ac luctus. Fusce dignissim justo sem, ut efficitur nibh sodales non. In feugiat mollis nunc,
                      in cursus arcu tempus imperdiet. Cras mollis dui semper sagittis tempor. Phasellus rhoncus, velit
                      eu eleifend gravida, nulla mauris molestie tortor, et feugiat ex turpis in lorem. Quisque
                      imperdiet vulputate condimentum. Praesent laoreet tortor venenatis velit malesuada, non fringilla
                      mi pulvinar. Etiam ut mattis leo. Etiam commodo id felis eget faucibus. Class aptent taciti
                      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </div>
                  </div>
                </td>
                <td className={'h-full relative'}>
                  <div
                    className={
                      'absolute top-0 bottom-0 flex flex-col justify-around ' +
                      styles.tableContentArea +
                      ' ' +
                      styles.tableCellText
                    }
                  >
                    <a href='https://vimeo.com/521772353' target={'_blank'}><Image src={FileViewIcon} alt={''} width={29} height={29} /></a>
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
