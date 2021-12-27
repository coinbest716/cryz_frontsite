import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
import measureEdit from 'public/images/measure-edit.svg'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// styles
import styles from './MobileGraphicProfile.module.scss'

const MobileGraphicProfile = props => {
  const { graphicInfo, monthData, currentMonthIndex } = props
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const router = useRouter()

  const handleClickBack = () => {
    router.push('/dashboard/profile#main', undefined, { shallow: true })
  }

  const handleClickEdit = () => {
    router.push('/dashboard/profile#health', undefined, { shallow: true })
  }

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
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        position: 'bottom',
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
    <>
      <div className={styles.header + ' p-4'}>
        <div
          className="flex justify-start items-center w-fit cursor-pointer"
          style={{ width: 'fit-content' }}
          onClick={handleClickBack}
        >
          <Image src={ArrowLeftWhite} width={18} height={15} alt="" />
          <div className={styles.backString + ' ml-2'}>Perfil</div>
        </div>
        <div className="flex justify-end">
          <div className={styles.saveButton} onClick={handleClickEdit}>
            <Image src={measureEdit} alt="" width={25} height={25} />
          </div>
        </div>
        <div className={styles.title}>Datos antropométricos</div>
      </div>
      <div className="p-5 mb-28">
        <div className={'py-2 ' + styles.graphictitle}>Perímetros</div>
        <Chart options={barChartOptions.options} series={perimeterSeries.series} type="bar" height="270px" />
        <div className={'pt-5 pb-2 ' + styles.graphictitle}>Porcentajes</div>
        <Chart options={lineChartOptions.options} series={percentageSeries.series} type="line" height="300px" />
        <div className={'pt-5 pb-2 ' + styles.graphictitle}>Peso</div>
        <Chart options={lineChartOptions.options} series={pesoSeries.series} type="area" height="300px" />
        <div className={'pt-5 pb-2 ' + styles.graphictitle}>Edad metabólica</div>
        <Chart options={lineChartOptions.options} series={edadSeries.series} type="line" height="300px" />
        <div className={'pt-5 pb-2 ' + styles.graphictitle}>Gasto metabólico</div>
        <Chart options={lineChartOptions.options} series={gastoSeries.series} type="line" height="300px" />
        <div className={'pt-5 pb-2 ' + styles.graphictitle}>Altura</div>
        <Chart options={lineChartOptions.options} series={heightSeries.series} type="line" height="300px" />
      </div>
    </>
  )
}
export default MobileGraphicProfile
