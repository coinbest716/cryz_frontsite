export const chartOptionsData = {
  series: [
    {
      name: 'Actividad semanal',
      data: [4, 20, 10, 30, 36, 80, 30, 91],
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
    theme: {
      monochrome: {
        enabled: true,
        color: '#818E8E',
        shadeTo: 'light',
      },
    },
    xaxis: {
      categories: ['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'],
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'bottom',
    },
    grid: {
      show: false,
    },
  },
}

export const messageData = [
  {
    name: 'Oluchi Mazi',
    content: 'I’m getting a late today',
  },
  {
    name: 'Shinohara Ryoma',
    content: 'What are the homework…',
  },
  {
    name: 'Paromita Haque',
    content: 'I’m getting a late today',
  },
  {
    name: 'Oluchi Mazi',
    content: 'I’m getting a late today',
  },
  {
    name: 'Shinohara Ryoma',
    content: 'What are the homework…',
  },
  {
    name: 'Paromita Haque',
    content: 'I’m getting a late today',
  },
]
