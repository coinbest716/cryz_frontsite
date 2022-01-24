import React, { useState, useEffect } from 'react'

// next components
import Image from 'next/image'

// third party components
import toast from 'react-hot-toast'
import Video from 'twilio-video'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import fetch from 'isomorphic-unfetch'

// custom components
import Participant from './Participant'
import SelfVideo from './SelfVideo'

// styles
import styles from './VideoChat.module.scss'

const VideoChat = props => {
  // variables
  const { sessionId, viewport, onChangeRoom } = props
  const handle = useFullScreenHandle()

  const [participants, setParticipants] = useState([])
  const [connectStatus, setConnectStatus] = useState('init')
  const [room, setRoom] = useState(null)
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
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height

  // handlers
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
      const participantConnected = participant => {
        setParticipants(prevParticipants => [...prevParticipants, participant])
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
        console.error(err)
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

  const remoteParticipants = room !== null && (
    <Participant key={room.localParticipant.sid} participant={room.localParticipant} viewport={viewport} />
  )

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
    if (!fullScreenMode) {
      handle.enter()
    } else {
      handle.exit()
    }
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <FullScreen onChange={event => onFullScreenChange(event)} handle={handle}>
          {room ? (
            <div className={'w-full h-full relative bg-black'}>
              <div style={{ width: screenWidth - 32, height: (screenWidth - 32) * 0.56 + 90 }}>
                {participants.length !== 0 && (
                  <SelfVideo
                    key={participants[0].sid}
                    participant={participants[0]}
                    width={screenWidth - 32}
                    height={(screenWidth - 32) * 0.56}
                    cameraEnabled={cameraStatus}
                    audioEnabled={micStatus}
                  />
                )}
              </div>

              <div
                className={'absolute right-1'}
                style={{
                  width: '130px',
                  height: `${120 * remoteParticipants.length}px`,
                  bottom: 100,
                }}
              >
                {remoteParticipants}
              </div>

              <div
                className={'absolute bottom-0 w-full flex justify-between items-center px-5 ' + styles.micCameraArea}
              >
                {/* <div className="flex justify-start">
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
                </div> */}
                <div className="app-streaming-full-screen" onClick={fullScreenToggler}>
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
            {room && participants.length !== 0 && (
              <SelfVideo
                key={participants[0].sid}
                participant={participants[0]}
                width={videoWidth}
                height={videoHeight}
                cameraEnabled={cameraStatus}
                audioEnabled={micStatus}
              />
            )}
            {connectStatus === 'disconnect' ? <div className={styles.text}>La retrasmisión ha terminado</div> : ''}
            {connectStatus === 'init' ? <div className={styles.text}>Uniéndose al evento...</div> : ''}

            <div style={{ position: 'absolute', top: 4, right: 10 }}>
              <button className="app-twilio-chat-button" onClick={joinAudio}>
                Join Audio
              </button>
            </div>

            <div
              className={'absolute bottom-0.5 right-0.5'}
              style={{
                width: '360px',
                height: `${232 * remoteParticipants.length}px`,
              }}
            >
              {remoteParticipants}
            </div>
          </div>

          <div className={'w-full'} style={{ height: '95px', background: '#708393' }}>
            <div className={'flex justify-between items-center w-full h-full'}>
              <div className={'flex items-center'}>
                <div
                  className={'relative '}
                  style={{
                    width: '103px',
                    height: '85px',
                    marginLeft: '45px',
                  }}
                >
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

                  {/* <Image
                    src={micStatus ? '/images/mic-on.svg' : '/images/mic-off.svg'}
                    className="cursor-pointer"
                    width={103}
                    height={85}
                    alt="Silence"
                    onClick={() => controlMic()}
                  /> */}
                  {/* <Image
                src="/mic-choose.svg"
                className="cursor-pointer"
                width={16}
                height={13}
                alt="choose"
                onClick={() => showMicList()}
              /> */}
                </div>

                {/* <div className="app-streaming-camera-button">
                  <Image
                    src={cameraStatus ? '/images/camera-on.svg' : '/images/camera-off.svg'}
                    className="cursor-pointer"
                    width={103}
                    height={85}
                    alt="Silence"
                    onClick={() => controlCamera()}
                  />
                </div> */}

                <div className="app-streaming-full-screen" onClick={fullScreenToggler}>
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
