import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

// custom components
import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import SearchOrder from 'components/components/dashboard/SearchOrder'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from './shopping.module.scss'

const Shopping = () => {
  const monthList = [
    { id: 1, month: 'January' },
    { id: 2, month: 'February' },
    { id: 3, month: 'March' },
    { id: 4, month: 'April' },
    { id: 5, month: 'May' },
    { id: 6, month: 'Jun' },
    { id: 7, month: 'July' },
    { id: 8, month: 'August' },
    { id: 9, month: 'September' },
    { id: 10, month: 'October' },
    { id: 11, month: 'November' },
    { id: 12, month: 'December' },
  ]
  const [selectedMonth, setSelectedMonth] = React.useState('January')

  const handleChange = event => {
    setSelectedMonth(event.target.value)
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
      <table className="w-full table-auto">
        <thead className={styles.tableHead}>
          <tr>
            <th>
              <div className={styles.tableContentArea + ' ' + styles.tableHeadTitle}>PEDIDO</div>
            </th>
            <th>
              <div className={styles.tableContentArea + ' ' + styles.tableHeadTitle}>DETALLE</div>
            </th>
            <th>
              <div className={styles.tableContentArea + ' ' + styles.tableHeadTitle}>FECHA</div>
            </th>
            <th>
              <div className={styles.tableContentArea + ' ' + styles.tableHeadTitle}>PRECIO</div>
            </th>
            <th>
              <div className={styles.tableContentArea + ' ' + styles.tableHeadTitle}>PDF</div>
            </th>
          </tr>
        </thead>
        <tbody className={'mt-4 ' + styles.tbody}>
          <tr>
            <td className="h-full relative">
              <div
                className={
                  'absolute top-0 bottom-0 flex flex-col justify-around ' +
                  styles.tableContentArea +
                  ' ' +
                  styles.tableCellText
                }
              >
                <div className="flex items-start">Order #239</div>
                <div className="flex items-end mb-2">
                  <Chip label={'PAGADO'} bgColor={'#54BD97'} />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                Adam
                <br />
                Adam
                <br />
                Adam
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>858</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>858</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>858</div>
            </td>
          </tr>
          <tr className="bg-white">
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design
              </div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>Adam</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>112</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>112</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>112</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>Intro to JavaScript</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>Chris</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>1,280</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>1,280</div>
            </td>
            <td>
              <div className={styles.tableContentArea + ' ' + styles.tableCellText}>1,280</div>
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
