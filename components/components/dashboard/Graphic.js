import React, { useState } from 'react'
import Image from 'next/image'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import User from 'assets/images/team-member-01.png'
import styles from './Graphic.module.scss'
import measureGraphic from 'public/images/measure-graphic.svg'
import measureEdit from 'public/images/measure-edit.svg'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Graphic = props => {
  const { handleClickTab } = props
  const [monthIndex, setMonthIndex] = useState(0)
  const month = ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oct', 'Now', 'Dic']

  const fatChartOptions = {
    series: [
      {
        name: '% Grasa',
        data: [4, 20, 10, 30, 36, 80, 30, 91, 12, 43, 16, 20],
      },
      {
        name: 'Grasa visceral',
        data: [4, 10, 14, 23, 46, 30, 40, 31, 16, 23, 26, 25],
      },
    ],
    options: {
      chart: {
        background: 'transparent',
        foreColor: '#939AAC',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        categories: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oct', 'Now', 'Dic'],
      },
      yaxis: {
        show: true,
      },
      legend: {
        position: 'bottom',
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        position: 'right',
        horizontalAlign: 'center',
      },
    },
  }

  const bodyChartOptions = {
    series: [
      {
        name: 'Peso',
        data: [4, 20, 10, 30, 36, 80, 30, 91, 12, 43, 16, 20],
      },
      {
        name: 'Altura',
        data: [4, 10, 14, 23, 46, 30, 40, 31, 16, 23, 26, 25],
      },
      {
        name: '% Agua',
        data: [20, 14, 23, 46, 4, 30, 40, 31, 16, 23, 26, 21],
      },
      {
        name: 'IMMuscular',
        data: [23, 46, 30, 40, 31, 16, 5, 30, 14, 23, 26, 25],
      },
      {
        name: 'IMOsea',
        data: [23, 46, 30, 40, 31, 16, 23, 26, 25, 6, 10, 14],
      },
      {
        name: 'Gasto metabolico',
        data: [7, 10, 14, 23, 46, 30, 40, 31, 16, 23, 26, 29],
      },
      {
        name: 'Edad metabolica',
        data: [9, 10, 40, 31, 16, 23, 26, 25, 14, 23, 46, 30],
      },
      {
        name: 'IMCorporal',
        data: [1, 10, , 23, 26, 25, 14, 23, 46, 30, 40, 31, 16],
      },
    ],
    options: {
      chart: {
        background: 'transparent',
        foreColor: '#939AAC',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        categories: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oct', 'Now', 'Dic'],
      },
      yaxis: {
        show: true,
      },
      legend: {
        position: 'bottom',
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        position: 'right',
        horizontalAlign: 'center',
      },
    },
  }

  const [perimeterChartOptions, setPerimeterChartOptions] = useState({
    series: [
      {
        name: 'perimeters',
        data: [10, 14, 16, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 20,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      xaxis: {
        categories: ['Brazo', 'Cintura', 'Cadera', 'Muslo', 'Gemelo'],
        position: 'bottom',
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        show: true,
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#818E8E',
          shadeTo: 'light',
        },
      },
    },
  })

  let monthData = [
    [10, 14, 16, 20],
    [16, 20, 10, 14],
    [14, 11, 18, 30],
    [10, 14, 16, 20],
    [16, 20, 10, 14],
    [14, 11, 18, 30],
    [10, 14, 16, 20],
    [16, 20, 10, 14],
    [14, 11, 18, 30],
    [10, 14, 16, 20],
    [16, 20, 10, 14],
    [14, 11, 18, 30],
  ]

  const handleClickMonth = type => {
    let newObj = JSON.parse(JSON.stringify(perimeterChartOptions))

    const _monthIndex = monthIndex
    if (type === 'previous') {
      if (_monthIndex <= 0) {
        setMonthIndex(11)
        newObj.series[0].data = monthData[11]
        setPerimeterChartOptions(newObj)
      } else {
        setMonthIndex(_monthIndex - 1)
        newObj.series[0].data = monthData[_monthIndex - 1]
        setPerimeterChartOptions(newObj)
      }
    } else if (type === 'next') {
      if (_monthIndex >= 11) {
        setMonthIndex(0)
        newObj.series[0].data = monthData[0]
        setPerimeterChartOptions(newObj)
      } else {
        setMonthIndex(_monthIndex + 1)
        newObj.series[0].data = monthData[_monthIndex - 1]
        setPerimeterChartOptions(newObj)
      }
    }
  }

  return (
    <div className={'px-20 py-8 ' + styles.container}>
      <div className={'flex justify-start items-center'}>
        <div
          className={'flex justify-between items-center ' + styles.measureGraphic}
          onClick={() => handleClickTab('health')}
        >
          <Image src={measureEdit} width={38} height={34} />
        </div>
      </div>
      <div className={'w-full my-6 ' + styles.divider} />
      <div className={'grid grid-cols-12 gap-8'}>
        <div className={'col-span-12 md:col-span-8 sm:col-span-12'}>
          <div className={'pb-8'}>
            <div className={styles.title}>Datos Antropométricos</div>
            <Chart options={fatChartOptions.options} series={fatChartOptions.series} type="area" height="300px" />
          </div>
          <div className={'pt-8'}>
            <Chart options={bodyChartOptions.options} series={bodyChartOptions.series} type="line" height="300px" />
          </div>
        </div>
        <div className={'col-span-12 md:col-span-4 sm:col-span-12 flex justify-center items-center'}>
          <div>
            <div className={'flex justify-between items-center'}>
              <div className={'pb-8 ' + styles.title}>Perímetros</div>
              <div className={'flex justify-between items-center'}>
                <div
                  className={'p-1 rounded-2xl bg-gray-200 cursor-pointer'}
                  onClick={() => handleClickMonth('previous')}
                >
                  <img src="/images/message-left.svg" style={{ width: '10px', height: '10px' }}></img>
                </div>
                <div className={'px-2 w-8 text-center ' + styles.month}>{month[monthIndex]}</div>
                <div className={'p-1 rounded-2xl bg-gray-200 cursor-pointer'} onClick={() => handleClickMonth('next')}>
                  <img src="/images/message-right.svg" style={{ width: '10px', height: '10px' }}></img>
                </div>
              </div>
            </div>
            <Chart
              options={perimeterChartOptions.options}
              series={perimeterChartOptions.series}
              type="bar"
              height="350px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Graphic
