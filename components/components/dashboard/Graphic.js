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

  const percentageSeries = {
    series: [
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
        name: '% Grasa',
        data: graphicInfo.fatPercentage,
      },
      {
        name: '% Grasa visceral',
        data: graphicInfo.visceralFat,
      },
    ],
  }

  let perimeterSeries = {
    series: [
      {
        name: 'perimeters',
        data: monthData[monthIndex],
      },
    ],
  }

  const pesoSeries = {
    series: [
      {
        name: 'kg Peso',
        data: graphicInfo.weight,
      },
    ],
  }

  const edadSeries = {
    series: [
      {
        name: 'años Edad metabolica',
        data: graphicInfo.metabolicAge,
      },
    ],
  }

  const gastoSeries = {
    series: [
      {
        name: 'kcal Gasto metabolico',
        data: graphicInfo.metabolicExpense,
      },
    ],
  }

  const heightSeries = {
    series: [
      {
        name: 'cm Altura',
        data: graphicInfo.height,
      },
    ],
  }

  const lineChartOptions = {
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

  const barChartOptions = {
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
          columnWidth: '30%',
          borderRadius: 15,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      xaxis: {
        categories: ['Brazo', 'Cintura', 'Cadera', 'Muslo', 'Gemelo'], // 'Muslo', 'Gemelo'
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
        <div className={'col-span-12 md:col-span-7 sm:col-span-12 pt-8'}>
          <div className={styles.title}>Porcentajes</div>
          <Chart options={lineChartOptions.options} series={percentageSeries.series} type="line" height="300px" />
        </div>
        <div className={'col-span-12 md:col-span-5 sm:col-span-12 pt-8'}>
          <div>
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
              <Chart options={barChartOptions.options} series={perimeterSeries.series} type="bar" height="270px" />
            </div>
          </div>
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-8'}>
        <div className={'col-span-12 md:col-span-6 sm:col-span-12 pt-8'}>
          <div className={styles.title}>Peso</div>
          <Chart options={lineChartOptions.options} series={pesoSeries.series} type="area" height="300px" />
        </div>
        <div className={'col-span-12 md:col-span-6 sm:col-span-12 pt-8'}>
          <div className={styles.title}>Edad metabólica</div>
          <Chart options={lineChartOptions.options} series={edadSeries.series} type="line" height="300px" />
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-8'}>
        <div className={'col-span-12 md:col-span-6 sm:col-span-12 pt-8'}>
          <div className={styles.title}>Gasto metabólico</div>
          <Chart options={lineChartOptions.options} series={gastoSeries.series} type="line" height="300px" />
        </div>
        <div className={'col-span-12 md:col-span-6 sm:col-span-12 pt-8'}>
          <div className={styles.title}>Altura</div>
          <Chart options={lineChartOptions.options} series={heightSeries.series} type="line" height="300px" />
        </div>
      </div>
    </div>
  )
}

export default Graphic
