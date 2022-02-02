import React, { useState, useEffect } from 'react'

// next components
import Image from 'next/image'

// third party components
import toast from 'react-hot-toast'
import Video from 'twilio-video'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import fetch from 'isomorphic-unfetch'
import { isIOS } from 'react-device-detect'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// custom components
import Participant from './Participant'
import LocalParticipant from './LocalParticipant'
import SelfVideo from './SelfVideo'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './VideoChat.module.scss'

const VideoChat = props => {
  // variables
  const { sessionId, viewport, onChangeRoom } = props
  const handle = useFullScreenHandle()

  const [localParticipant, setLocalParticipant] = useState('{}')
  const [participants, setParticipants] = useState([])
  const [selectedParticipant, setSelectedParticipant] = useState('{}')
  const [connectStatus, setConnectStatus] = useState('init')
  const [room, setRoom] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [userName, setUsername] = useState('')
  const [roomName, setRoomName] = useState('')
  const [micStatus, setMicStatus] = useState(true)
  const [cameraStatus, setCameraStatus] = useState(true)
  const [showCloseBtn, setShowCloseBtn] = useState(true)
  const [micChooseDlg, setMicChooseDlg] = useState(false)
  const [fullScreenMode, setFullScreenMode] = useState(false)
  const [videoWidth, setVideoWidth] = useState(1138)
  const [videoHeight, setVideoHeight] = useState(640)
  const [bgColor, setBGColor] = useState('#708393')
  const defaultWidth = 1138
  const defaultHeight = 640
  const [isRotated, setIsRotated] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  const [screenHeight, setScreenHeight] = useState(window.screen.height)

  window.addEventListener('orientationchange', function (event) {
    setIsRotated(!isRotated)
  })

  // handlers
  useEffect(() => {
    setScreenWidth(window.screen.width)
    setScreenHeight(window.screen.height)
  }, [isRotated])
  useEffect(() => {
    if (sessionId !== -1) {
      initTwilioConnet(`Crysdyaz_${sessionId}`, localStorage.getItem('email'))
    }
    return () => {
      handleLogout()
    }
  }, [sessionId])

  useEffect(() => {
    if (room) {
      setConnectStatus('connect')
      const tidyUp = event => {
        if (event.persisted) {
          return
        }
        if (room) {
          handleLogout()
        }
      }
      window.addEventListener('pagehide', tidyUp)
      window.addEventListener('beforeunload', tidyUp)
      return () => {
        window.removeEventListener('pagehide', tidyUp)
        window.removeEventListener('beforeunload', tidyUp)
      }
    }
  }, [room])

  useEffect(() => {
    if (room) {
      setLocalParticipant(room.localParticipant)
      let count = 0
      const participantConnected = participant => {
        if (count === 0) {
          setSelectedParticipant(participant)
        } else {
          setParticipants(prevParticipants => [...prevParticipants, participant])
        }
        count++
      }

      const participantDisconnected = participant => {
        setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant))
      }

      room.on('participantConnected', participantConnected)
      room.on('participantDisconnected', participantDisconnected)
      room.participants.forEach(participantConnected)
      onChangeRoom(room)
      return () => {
        room.off('participantConnected', participantConnected)
        room.off('participantDisconnected', participantDisconnected)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room])

  async function initTwilioConnet(room_name, user_name) {
    setRoomName(room_name)
    setUsername(user_name)
    const graphql_endpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT
    const endpoints = graphql_endpoint.split('graphql')
    const endpoint = endpoints[0]
    let url = `${endpoint}video/token`
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        identity: user_name,
        room: room_name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())

    Video.connect(data.token, {
      name: room_name,
    })
      .then(room => {
        setShowCloseBtn(true)
        setRoom(room)
      })
      .catch(err => {
        console.log('get room error', err)
      })
  }

  const handleLogout = () => {
    setRoom(prevRoom => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach(trackPub => {
          trackPub.track.stop()
        })
        prevRoom.disconnect()
        setShowCloseBtn(false)
        setConnectStatus('disconnect')
        setParticipants([])
      }
      return null
    })
  }

  const joinAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        toast.success('Puedes usar tu micrófono!')
      })
      .catch(function (err) {
        toast.error('No mic for you!')
      })
  }

  const localParticipantElem = localParticipant !== '{}' && (
    <LocalParticipant
      key={localParticipant.sid}
      participant={localParticipant}
      viewport={viewport}
      cameraEnabled={cameraStatus}
      audioEnabled={micStatus}
    />
  )

  const remoteParticipants =
    participants !== null &&
    participants.map((item, index) => <Participant key={index} participant={item} viewport={viewport} />)

  const controlMic = () => {
    setMicStatus(!micStatus)
  }

  const controlCamera = () => {
    setCameraStatus(!cameraStatus)
  }

  const onFullScreenChange = (state, handle) => {
    if (state) {
      setVideoWidth(screenWidth)
      setVideoHeight(screenHeight - 95)
      setBGColor('#000000')
    } else {
      setVideoWidth(defaultWidth)
      setVideoHeight(defaultHeight)
      setBGColor('#4A4A4A')
    }
    setFullScreenMode(state)
  }

  const fullScreenToggler = () => {
    setIsFullScreen(!isFullScreen)
    if (!fullScreenMode) {
      handle.enter()
    } else {
      handle.exit()
    }
  }

  return (
    <>
      {viewport === 'mobile' ? (
        // android
        isIOS === false ? (
          <FullScreen onChange={event => onFullScreenChange(event)} handle={handle}>
            {room ? (
              <div className={'w-full h-full relative flex justify-center items-center bg-black'}>
                <div style={{ width: screenWidth - 32, height: (screenWidth - 32) * 0.56 + 90, paddingBottom: '90px' }}>
                  {selectedParticipant !== '{}' && (
                    <SelfVideo key={selectedParticipant.sid} participant={selectedParticipant} />
                  )}
                </div>

                <div className={'absolute top-4 bottom-4 right-4'} style={{ width: '120px', paddingBottom: '90px' }}>
                  <PerfectScrollbar>
                    {localParticipantElem}
                    {remoteParticipants}
                  </PerfectScrollbar>
                </div>

                <div
                  className={'absolute bottom-0 w-full flex justify-between items-center px-5 ' + styles.micCameraArea}
                >
                  <div className="flex justify-start">
                    <Image
                      src={micStatus ? '/images/mic-on.svg' : '/images/mic-off.svg'}
                      className="cursor-pointer"
                      width={60}
                      height={50}
                      alt="Silence"
                      onClick={() => controlMic()}
                    />
                    <Image
                      src={cameraStatus ? '/images/camera-on.svg' : '/images/camera-off.svg'}
                      className="cursor-pointer"
                      width={60}
                      height={50}
                      alt="Silence"
                      onClick={() => controlCamera()}
                    />
                  </div>
                  <div onClick={() => fullScreenToggler()}>
                    <Image
                      src={'/images/full-screen.svg'}
                      className="cursor-pointer"
                      width={135}
                      height={72}
                      alt="Fullscreen"
                    />
                  </div>

                  {showCloseBtn ? (
                    <div className={styles.closeButton} onClick={() => handleLogout()}>
                      Fin
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4">Tu entrenador llegará pronto</div>
            )}
          </FullScreen>
        ) : (
          // iphone
          <>
            {room ? (
              <div
                className={
                  isFullScreen
                    ? 'absolute w-screen h-screen overflow-hidden top-0 bottom-0 left-0 right-0 bg-black'
                    : 'w-full h-full relative bg-black'
                }
                style={{ zIndex: isFullScreen ? 100000 : 1 }}
              >
                <div
                  style={{
                    width: isFullScreen ? screenWidth : screenWidth - 32,
                    height: isFullScreen ? screenHeight : (screenWidth - 32) * 0.56 + 90,
                    paddingBottom: '90px',
                  }}
                >
                  {selectedParticipant !== '{}' && (
                    <SelfVideo key={selectedParticipant.sid} participant={selectedParticipant} />
                  )}
                </div>

                <div className={'absolute top-4 bottom-4 right-4'} style={{ width: '120px', paddingBottom: '90px' }}>
                  <PerfectScrollbar>
                    {localParticipantElem}
                    {remoteParticipants}
                  </PerfectScrollbar>
                </div>

                <div
                  className={'absolute bottom-0 w-full flex justify-between items-center px-5 ' + styles.micCameraArea}
                >
                  <div className="flex justify-start">
                    <Image
                      src={micStatus ? '/images/mic-on.svg' : '/images/mic-off.svg'}
                      className="cursor-pointer"
                      width={60}
                      height={50}
                      alt="Silence"
                      onClick={() => controlMic()}
                    />
                    <Image
                      src={cameraStatus ? '/images/camera-on.svg' : '/images/camera-off.svg'}
                      className="cursor-pointer"
                      width={60}
                      height={50}
                      alt="Silence"
                      onClick={() => controlCamera()}
                    />
                  </div>
                  <div onClick={() => fullScreenToggler()}>
                    <Image
                      src={'/images/full-screen.svg'}
                      className="cursor-pointer"
                      width={135}
                      height={72}
                      alt="Fullscreen"
                    />
                  </div>

                  {showCloseBtn ? (
                    <div className={styles.closeButton} onClick={() => handleLogout()}>
                      Fin
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4">Tu entrenador llegará pronto</div>
            )}
          </>
        )
      ) : (
        <FullScreen onChange={event => onFullScreenChange(event)} handle={handle}>
          <div
            className="relative w-full"
            style={{
              background: `${bgColor}`,
              height: fullScreenMode ? `calc(100% - 95px)` : '640px',
            }}
            onClick={() => {
              setMicChooseDlg(false)
            }}
          >
            {selectedParticipant !== '{}' && (
              <SelfVideo key={selectedParticipant.sid} participant={selectedParticipant} />
            )}
            {connectStatus === 'disconnect' ? <div className={styles.text}>La retrasmisión ha terminado</div> : ''}
            {connectStatus === 'init' ? <div className={styles.text}>Uniéndose al evento...</div> : ''}

            <div className="absolute top-1 right-2">
              <button className={globalStyles.appTwilioChatButton} onClick={() => joinAudio()}>
                Join Audio
              </button>
            </div>

            <div className={'absolute top-16 bottom-4 right-4'} style={{ width: '240px' }}>
              <PerfectScrollbar>
                {localParticipantElem}
                {remoteParticipants}
              </PerfectScrollbar>
            </div>
          </div>

          <div className={'w-full ' + styles.style01}>
            <div className={'flex justify-between items-center w-full h-full'}>
              <div className={'flex items-center'}>
                <div className={'relative ' + styles.style02}>
                  {micChooseDlg ? (
                    <div className={'absolute overflow-hidden ' + styles.micChooseDlgArea}>
                      <div className={styles.micChooseDlg}>Microfono</div>

                      <div className={'flex justify-center'}>
                        <div className={styles.micLine} />
                      </div>
                      <div className={styles.speakerText}>Altavoces</div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <Image
                    src={micStatus ? '/images/mic-on.svg' : '/images/mic-off.svg'}
                    className="cursor-pointer"
                    width={103}
                    height={85}
                    alt="Silence"
                    onClick={() => controlMic()}
                  />
                  <Image
                    src="/mic-choose.svg"
                    className="cursor-pointer"
                    width={16}
                    height={13}
                    alt="choose"
                    onClick={() => showMicList()}
                  />
                </div>

                <div className="app-streaming-camera-button">
                  <Image
                    src={cameraStatus ? '/images/camera-on.svg' : '/images/camera-off.svg'}
                    className="cursor-pointer"
                    width={103}
                    height={85}
                    alt="Silence"
                    onClick={() => controlCamera()}
                  />
                </div>

                <div onClick={() => fullScreenToggler()}>
                  <Image
                    src={'/images/full-screen.svg'}
                    className="cursor-pointer"
                    width={135}
                    height={72}
                    alt="Fullscreen"
                  />
                </div>
              </div>

              {showCloseBtn ? (
                <div
                  className={'text-center mx-5 cursor-pointer ' + styles.closeButtonWeb}
                  onClick={() => handleLogout()}
                >
                  Fin
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </FullScreen>
      )}
    </>
  )
}

export default VideoChat
