import React, { useState } from 'react'

// next components
import Image from 'next/image'
import styles from './Graphic.module.scss'
import measureEdit from 'public/images/measure-edit.svg'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Graphic = props => {
  const { handleClickTab, graphicInfo, monthData, currentMonthIndex } = props
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex)
  const month = ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oct', 'Now', 'Dic']

  const fatChartOptions = {
    series: [
      {
        name: '% Grasa',
        data: graphicInfo.fatPercentage,
      },
      {
        name: '% Grasa visceral',
        data: graphicInfo.visceralFat,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
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
        name: 'kg Peso',
        data: graphicInfo.weight,
      },
      {
        name: 'cm Altura',
        data: graphicInfo.height,
      },
      {
        name: '% Agua',
        data: graphicInfo.waterPercentage,
      },
      {
        name: '% IMMuscular',
        data: graphicInfo.muscleMass,
      },
      {
        name: '% IMOsea',
        data: graphicInfo.boneMass,
      },
      {
        name: 'kcal Gasto metabolico',
        data: graphicInfo.metabolicExpense,
      },
      {
        name: 'años Edad metabolica',
        data: graphicInfo.metabolicAge,
      },
      {
        name: 'IMCorporal',
        data: graphicInfo.bodyMass,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
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

  let perimeterChartOptions = {
    series: [
      {
        name: 'perimeters',
        data: monthData[monthIndex],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 18,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      xaxis: {
        categories: ['Brazo', 'cm Cintura', 'cm Cadera', 'cm Muslo'], // 'Muslo', 'Gemelo'
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
  }

  const handleClickMonth = type => {
    if (type === 'previous') {
      if (monthIndex > 0) {
        setMonthIndex(monthIndex - 1)
      }
    } else if (type === 'next') {
      if (monthIndex < 11) {
        setMonthIndex(monthIndex + 1)
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
          <Image src={measureEdit} alt="" width={38} height={34} />
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
                  className={'p-1 rounded-2xl bg-gray-200 cursor-pointer h-5 w-5 flex justify-center items-center'}
                  onClick={() => handleClickMonth('previous')}
                >
                  <Image src={'/images/message-left.svg'} alt={''} width={10} height={10} />
                </div>
                <div className={'px-2 w-8 text-center ' + styles.month}>{month[monthIndex]}</div>
                <div
                  className={'p-1 rounded-2xl bg-gray-200 cursor-pointer h-5 w-5 flex justify-center items-center'}
                  onClick={() => handleClickMonth('next')}
                >
                  <Image src={'/images/message-right.svg'} alt={''} width={10} height={10} />
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
