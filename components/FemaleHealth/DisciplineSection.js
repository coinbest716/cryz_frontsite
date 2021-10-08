import React from 'react'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'components/FemaleHealth/DisciplineSection.module.scss'

const DisciplineSection = () => {
  const BoxInfo = [
    { id: 1, bgColor: '#f8f5f4', title: 'Suelo pélvico' },
    { id: 2, bgColor: '#F3F3EB', title: 'Preparación al parto' },
    { id: 3, bgColor: '#F1F1F1', title: 'Menopausia' },
    { id: 4, bgColor: '#99A7A9', title: 'Postparto' },
    { id: 5, bgColor: '#d9dfdf', title: 'Embarazo' },
    { id: 6, bgColor: '#e8ebeb', title: 'Asesoría del sueño infantil' },
    { id: 7, bgColor: '#cecbce', title: 'Entrena tu diástasis' },
  ]
  const BoxList = [
    // default
    {
      id: 0,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 3, width: 1, pos: 3 },
        { id: 4, width: 1, pos: 4 },
        { id: 5, width: 2, pos: 5 },
        { id: 6, width: 1, pos: 6 },
        { id: 7, width: 1, pos: 7 },
      ],
    },
    // box01 selected
    {
      id: 1,
      elem: [
        { id: 1, width: 2, pos: 1 },
        { id: 3, width: 1, pos: 2 },
        { id: 4, width: 1, pos: 3 },
        { id: 5, width: 1, pos: 4 },
        { id: 2, width: 1, pos: 5 },
        { id: 6, width: 1, pos: 6 },
        { id: 7, width: 1, pos: 7 },
      ],
    },
    // box02 selected
    {
      id: 2,
      elem: [
        { id: 2, width: 2, pos: 1 },
        { id: 3, width: 1, pos: 2 },
        { id: 4, width: 1, pos: 3 },
        { id: 5, width: 1, pos: 4 },
        { id: 1, width: 1, pos: 5 },
        { id: 6, width: 1, pos: 6 },
        { id: 7, width: 1, pos: 7 },
      ],
    },
    // box03 selected
    {
      id: 3,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 3, width: 2, pos: 2 },
        { id: 4, width: 1, pos: 3 },
        { id: 5, width: 1, pos: 4 },
        { id: 2, width: 1, pos: 5 },
        { id: 6, width: 1, pos: 6 },
        { id: 7, width: 1, pos: 7 },
      ],
    },
    // box04 selected
    {
      id: 4,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 4, width: 2, pos: 3 },
        { id: 5, width: 1, pos: 4 },
        { id: 3, width: 1, pos: 5 },
        { id: 6, width: 1, pos: 6 },
        { id: 7, width: 1, pos: 7 },
      ],
    },
    // box05 selected
    {
      id: 5,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 3, width: 1, pos: 3 },
        { id: 4, width: 1, pos: 4 },
        { id: 5, width: 2, pos: 5 },
        { id: 6, width: 1, pos: 6 },
        { id: 7, width: 1, pos: 7 },
      ],
    },
    // box06 selected
    {
      id: 6,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 3, width: 1, pos: 3 },
        { id: 4, width: 1, pos: 4 },
        { id: 5, width: 1, pos: 5 },
        { id: 6, width: 2, pos: 6 },
        { id: 7, width: 1, pos: 7 },
      ],
    },
    // box07 selected
    {
      id: 7,
      elem: [
        { id: 1, width: 1, pos: 1 },
        { id: 2, width: 1, pos: 2 },
        { id: 3, width: 1, pos: 3 },
        { id: 4, width: 1, pos: 4 },
        { id: 5, width: 1, pos: 5 },
        { id: 6, width: 1, pos: 6 },
        { id: 7, width: 2, pos: 7 },
      ],
    },
  ]

  const [type, setType] = React.useState({})

  React.useEffect(() => {
    setType(BoxList[0])
  }, [])

  const handleSetType = item => {
    console.log('selected item = ', item)
    setType(BoxList[item.id])
  }

  return (
    <div className={globalStyles.container}>
      <div className={styles.container}>
        <div className={styles.title}>Disciplinas</div>
        <div className={styles.divider} />
        {/* disciplines part */}
        <div className="w-full flex flex-wrap">
          {JSON.stringify(type) !== JSON.stringify({}) ? (
            type.elem.map((item, index) => (
              <div
                key={index}
                className={'cursor-pointer ' + (item.width === 1 ? styles.box01 : styles.box02)}
                style={{ backgroundColor: BoxInfo[item.id - 1].bgColor }}
                onClick={() => handleSetType(item)}
              >
                id:{item.id} width:{item.width} pos:{item.pos}
                <br />
                {typeof item.width}
              </div>
            ))
          ) : (
            <></>
          )}
          {/* <div className={'cursor-pointer ' + styles.box01} style={{ backgroundColor: colorList[0].color }}></div>
          <div className={'cursor-pointer ' + styles.box01} style={{ backgroundColor: colorList[1].color }}></div>
          <div className={'cursor-pointer ' + styles.box01} style={{ backgroundColor: colorList[2].color }}></div>
          <div className={'cursor-pointer ' + styles.box01} style={{ backgroundColor: colorList[3].color }}></div>
          <div className={'cursor-pointer ' + styles.box02} style={{ backgroundColor: colorList[4].color }}></div>
          <div className={'cursor-pointer ' + styles.box00} style={{ backgroundColor: colorList[5].color }}></div>
          <div className={'cursor-pointer ' + styles.box01} style={{ backgroundColor: colorList[6].color }}></div>
          <div className={'cursor-pointer ' + styles.box01} style={{ backgroundColor: colorList[7].color }}></div> */}
        </div>
      </div>
    </div>
  )
}

export default DisciplineSection
