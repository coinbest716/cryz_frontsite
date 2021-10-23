import React from 'react'
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

  const perimeterChartOptions = {
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
    },
  }

  return (
    <div className={'px-20 py-8 ' + styles.container}>
      <div className="flex justify-start items-center">
        <div
          className={'flex justify-between items-center ' + styles.measureGraphic}
          onClick={() => handleClickTab('health')}
        >
          <Image src={measureEdit} width={38} height={34} />
        </div>
      </div>
      <div className={'w-full my-6 ' + styles.divider} />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-8 sm:col-span-12">
          <div className="pb-8">
            <div className={styles.title}>Datos Antropométricos</div>
            <Chart options={fatChartOptions.options} series={fatChartOptions.series} type="area" height="300px" />
          </div>
          <div className="pt-8">
            <Chart options={bodyChartOptions.options} series={bodyChartOptions.series} type="line" height="300px" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 sm:col-span-12 flex justify-center items-center">
          <div>
            <div className={'pb-8 ' + styles.title}>Perímetros</div>
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
