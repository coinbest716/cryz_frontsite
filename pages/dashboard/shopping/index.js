import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

// next components
import Image from 'next/image'
import router from 'next/router'

// custom components
import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import SearchOrder from 'components/components/dashboard/SearchOrder'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './shopping.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'
import DownloadIcon from 'assets/images/download.svg'
import DownloadDisableIcon from 'assets/images/download-disable.svg'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

const Shopping = () => {
  const monthList = [
    { id: 1, month: 'Enero' },
    { id: 2, month: 'Febrero' },
    { id: 3, month: 'Marzo' },
    { id: 4, month: 'Abril' },
    { id: 5, month: 'Mayo' },
    { id: 6, month: 'Junio' },
    { id: 7, month: 'Julio' },
    { id: 8, month: 'Agosto' },
    { id: 9, month: 'Septiembre' },
    { id: 10, month: 'Octubre' },
    { id: 11, month: 'Noviembre' },
    { id: 12, month: 'Diciembre' },
  ]
  const [selectedMonth, setSelectedMonth] = React.useState('January')

  const handleChange = event => {
    setSelectedMonth(event.target.value)
  }

  const handleGotoOrderDetail = () => {
    router.push('/dashboard/shopping/order-detail')
  }
  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Compras</div>
        <div className={'flex justify-end'}>
          <div className={'mr-36'}>
            <SearchOrder />
          </div>
          <div className={'mr-8'}>
            <NotificationButton />
          </div>
          <div>
            <Profile />
          </div>
        </div>
      </div>
      {/* month select part */}
      <div className={styles.monthArea}>
        <select
          name="select"
          onChange={handleChange}
          value={selectedMonth}
          className={'cursor-pointer flex justify-start items-center ' + styles.monthSelect}
        >
          {monthList.map((item, index) => (
            <option key={index} value={item.month}>
              {item.month}
            </option>
          ))}
        </select>
      </div>
      {/* table part */}
      <table className={'w-full table-auto'}>
        <thead className={styles.tableHead}>
          <tr>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>PEDIDO</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>DETALLE</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>FECHA</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>PRECIO</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>PDF</div>
            </th>
          </tr>
        </thead>
        <tbody className={'mt-4 ' + styles.tbody}>
          {/* first tr */}
          <tr>
            <td className={'h-full relative'}>
              <div
                className={
                  'absolute top-0 bottom-0 flex flex-col justify-around ' +
                  styles.tableContentArea +
                  ' ' +
                  styles.tableCellText
                }
              >
                <div className={'flex items-start'}>Order #239</div>
                <div className={'flex items-end mb-2'}>
                  <Chip data={OrderStateData[0]} onClick={() => {}} />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>10 sesiones entrenamiento</div>
                  </div>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>Bono nutrición</div>
                  </div>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>1 clase de pilates</div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>24/5</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <span className={styles.price}>$875</span>
                  <span className={styles.payment}>Paypal</span>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <Image src={DownloadIcon} alt={''} width={18} height={22} />
              </div>
            </td>
          </tr>
          {/* second tr */}
          <tr className={'bg-white'}>
            <td className={'h-full relative'}>
              <div
                className={
                  'absolute top-0 bottom-0 flex flex-col justify-around ' +
                  styles.tableContentArea +
                  ' ' +
                  styles.tableCellText
                }
              >
                <div className={'flex items-start'}>Order #238</div>
                <div className={'flex items-end mb-2'}>
                  <Chip data={OrderStateData[1]} onClick={() => {}} />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>10 sesiones entrenamiento</div>
                  </div>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>Bono nutrición</div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>24/5</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <span className={styles.price}>$875</span>
                  <span className={styles.payment}>Paypal</span>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <Image src={DownloadDisableIcon} alt={''} width={18} height={22} />
              </div>
            </td>
          </tr>
          {/* third tr */}
          <tr>
            <td className={'h-full relative'}>
              <div
                className={
                  'absolute top-0 bottom-0 flex flex-col justify-around ' +
                  styles.tableContentArea +
                  ' ' +
                  styles.tableCellText
                }
              >
                <div className={'flex items-start'}>Order #237</div>
                <div className={'flex items-end mb-2'}>
                  <Chip data={OrderStateData[2]} onClick={() => {}} />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>10 sesiones entrenamiento</div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>24/5</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <span className={styles.price}>$875</span>
                  <span className={styles.payment}>Paypal</span>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <Image src={DownloadDisableIcon} alt={''} width={18} height={22} />
              </div>
            </td>
          </tr>
          {/* forth tr */}
          <tr className={'bg-white'}>
            <td className={'h-full relative'}>
              <div
                className={
                  'absolute top-0 bottom-0 flex flex-col justify-around ' +
                  styles.tableContentArea +
                  ' ' +
                  styles.tableCellText
                }
              >
                <div className={'flex items-start'}>Order #236</div>
                <div className={'flex items-end mb-2'}>
                  <Chip data={OrderStateData[2]} onClick={() => {}} />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>10 sesiones entrenamiento</div>
                  </div>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>Bono nutrición</div>
                  </div>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>1 clase de pilates</div>
                  </div>
                  <div className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                    <Image src={FileViewIcon} alt={''} width={29} height={29} />
                    <div className={'ml-5'}>1 clase de pilates</div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>24/5</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <div className={'inline-grid'}>
                  <span className={styles.price}>$875</span>
                  <span className={styles.payment}>Paypal</span>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                <Image src={DownloadDisableIcon} alt={''} width={18} height={22} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Shopping

Shopping.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
