import React from 'react'

// next components
import Image from 'next/image'

// third party components
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'
import TeamMember01 from 'assets/images/team-member-01.png'
import SignImg from 'assets/images/sign.png'

// styles
import styles from 'components/Home/TeamSection.module.scss'
import globalStyles from 'styles/GlobalStyles.module.scss'

const TeamSection = props => {
  const { team } = props
    console.log(team)
  return team !== '' ? (
    <div className={globalStyles.container}>
      <div className={styles.title}>{team.title}</div>
      <div className={styles.divider}></div>
      <div className={globalStyles.tinyMCEClass}>
        <div
          className={'w-full md:w-1/2 tinymce-class ' + styles.text}
          dangerouslySetInnerHTML={{ __html: team.description }}
        />
      </div>
      <div className={'teamCarousel'}>
        {team !== '' && team.images.length !== 0 ? (
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            stopOnHover={true}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            centerMode={true}
            centerSlidePercentage={80}
            interval={5000}
            renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
              hasPrev ? (
                <button onClick={clickHandler} className={styles.previousButton}>
                  <Image src={previousButtonGrayIcon} alt="" width={20} height={15} />
                </button>
              ) : (
                <button onClick={clickHandler} className={styles.previousButton}>
                  <Image src={previousButtonGrayIcon} alt="" width={20} height={15} />
                </button>
              )
            }
            renderArrowNext={(clickHandler, hasNext, labelNext) =>
              hasNext ? (
                <button onClick={clickHandler} className={styles.nextButton}>
                  <Image onClick={clickHandler} src={nextButtonGrayIcon} alt="" width={20} height={15} />
                </button>
              ) : (
                <button onClick={clickHandler} className={styles.nextButton}>
                  <Image onClick={clickHandler} src={nextButtonGrayIcon} alt="" width={20} height={15} />
                </button>
              )
            }
          >
            {team !== '' &&
              team.images.map((item, index) => (
                <div key={index} className={'mx-1'}>
                  {item.type === 'image/png' || item.type === 'image/jpeg' ? (
                    <Image src={item.path} alt="" width={902} height={388} layout={'responsive'} objectFit={'cover'} />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
          </Carousel>
        ) : (
          <></>
        )}
      </div>
      <div className={'w-full flex mt-20 mb-11'}>
        <div className={'w-full md:w-1/2 flex justify-center items-center'}>
          <Image src={team.avatar !== null ? team.avatar : TeamMember01} alt="" width={355} height={368} />
        </div>
        <div className={'w-full md:w-1/2 flex flex-wrap justify-start items-center'}>
          <div className={globalStyles.tinyMCEClass}>
            <div className={styles.text + ' tinymce-class'} dangerouslySetInnerHTML={{ __html: team.text_one }} />
          </div>
          <div className={'w-full flex justify-between my-4'}>
            <Image
              src={team.sign !== null ? team.sign : SignImg}
              alt={''}
              width={467}
              height={234}
              className={styles.imageArea}
            />
            <div className={'w-full flex justify-end items-center'}>
              <SocialButtonGroup color="gray" socialURL={{ instagram: team.instagram, facebook: team.facebook }} />
            </div>
          </div>
          <div className={globalStyles.tinyMCEClass}>
            <div className={styles.text + ' tinymce-class'} dangerouslySetInnerHTML={{ __html: team.text_two }} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default TeamSection
