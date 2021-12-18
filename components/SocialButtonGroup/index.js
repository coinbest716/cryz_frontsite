import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { isMobile } from 'react-device-detect'

// images
import InstagramIcon from 'assets/images/instagram.svg'
import FacebookIcon from 'assets/images/facebook.svg'
import InstagramGrayIcon from 'assets/images/instagram-gray.svg'
import FacebookGrayIcon from 'assets/images/facebook-gray.svg'

const SocialButtonGroup = props => {
  const { color, socialURL } = props
  const [mobile, setMobile] = useState(null)

  useEffect(() => {
    setMobile(isMobile)
  }, [setMobile])

  return (
    <div className={'flex justify-between' + (mobile ? ' px-20' : '')}>
      <div className={'mx-1'}>
        <a target="_blank" href={socialURL.instagram} rel="noopener noreferrer">
          <button className={'w-8 h-8 duration-200 hover:bg-gray-500 rounded-full flex justify-center items-center'}>
            <Image
              src={color === 'white' ? InstagramIcon : color === 'gray' ? InstagramGrayIcon : ''}
              alt=""
              with={24}
              height={24}
            />
          </button>
        </a>
      </div>
      <div className={'mx-1'}>
        <a target="_blank" href={socialURL.facebook} rel="noopener noreferrer">
          <button className={'w-8 h-8 duration-200 hover:bg-gray-500 rounded-full flex justify-center items-center'}>
            <Image
              src={color === 'white' ? FacebookIcon : color === 'gray' ? FacebookGrayIcon : ''}
              alt=""
              with={24}
              height={24}
            />
          </button>
        </a>
      </div>
    </div>
  )
}

export default SocialButtonGroup
