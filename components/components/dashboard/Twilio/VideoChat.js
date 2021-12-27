import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppBaseAlert } from 'src/components/base'
// next components
import Image from 'next/image'
import toast from 'react-hot-toast'

import Video from 'twilio-video'
import Room from './Room'
import Participant from './Participant'
import SelfVideo from './SelfVideo'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import fetch from 'isomorphic-unfetch'
import { Auth } from 'aws-amplify'

const text_styles = {
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  fontWeight: 600,
  fontStyle: 'normal',
  fontSize: '48px',
  letterSpacing: '0.21px',
  color: 'white',
}

const VideoChat = props => {
  // const { sessionId } = useParams()
  const { sessionId, viewport } = props
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
  // const [alert, setAlert] = useState({ type: '', active: false, message: '' })
  const defaultWidth = 1138
  const defaultHeight = 640
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height

  // handlers
  useEffect(() => {
    if (sessionId > 0) {
      initTwilioConnet(`Crysdyaz_${sessionId}`, localStorage.getItem('email'))
    }
    // Auth.currentSession()
    //   .then(data => {
    //     initTwilioConnet(`Crysdyaz_${sessionId}`, data.idToken.payload.email)
    //   })
    //   .catch(err => console.log(err))

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
      return () => {
        room.off('participantConnected', participantConnected)
        room.off('participantDisconnected', participantDisconnected)
      }
    }
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
    console.log('--------join Audio---------')

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log('You let me use your mic!')
        toast.success('Puedes usar tu micrófono!')
        // setAlert({ type: 'success', active: true, message: 'Puedes usar tu micrófono!' })
      })
      .catch(function (err) {
        console.log('No mic for you!')
      })
  }

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} viewport={viewport} />
  ))

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
    }
  }

  return (
    <>
      {fullScreenMode === false ? (
        <>
          {room ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: '#000',
              }}
            >
              <div
                style={{
                  width: screenWidth - 32,
                  height: viewport === 'mobile' ? (screenWidth - 32) * 0.56 : screenHeight - 64,
                }}
              >
                {viewport}
                <SelfVideo
                  key={room.localParticipant.sid}
                  participant={room.localParticipant}
                  width={screenWidth - 32}
                  height={viewport === 'mobile' ? (screenWidth - 32) * 0.56 : screenHeight - 64}
                  cameraEnabled={cameraStatus}
                  audioEnabled={micStatus}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  width: '130px',
                  height: `${120 * remoteParticipants.length}px`,
                  bottom: 100,
                  right: 4,
                }}
              >
                {remoteParticipants}
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: '90px',
                  background: '#708393',
                }}
              >
                <Image
                  src={micStatus ? '/images/mic-on.svg' : '/images/mic-off.svg'}
                  className="cursor-pointer"
                  width={60}
                  height={50}
                  alt="Silence"
                  onClick={() => controlMic()}
                />

                <div className="app-streaming-camera-button">
                  <Image
                    src={cameraStatus ? '/images/camera-on.svg' : '/images/camera-off.svg'}
                    className="cursor-pointer"
                    width={60}
                    height={50}
                    alt="Silence"
                    onClick={() => controlCamera()}
                  />
                </div>

                {showCloseBtn ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 10,
                      width: '120px',
                      height: '40px',
                      background: '#F86C6B',
                      fontSize: '24px',
                      fontWeight: '400',
                      color: '#FFF',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleLogout()}
                  >
                    Fin
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            'No video streaming!'
          )}
        </>
      ) : (
        <FullScreen onChange={onFullScreenChange} handle={handle}>
          <div
            style={{
              position: 'relative',
              background: `${bgColor}`,
              width: '100%',
              height: fullScreenMode ? `calc(100% - 95px)` : '640px',
            }}
            onClick={() => {
              setMicChooseDlg(false)
            }}
          >
            {room ? (
              <SelfVideo
                key={room.localParticipant.sid}
                participant={room.localParticipant}
                width={videoWidth}
                height={videoHeight}
                cameraEnabled={cameraStatus}
                audioEnabled={micStatus}
              />
            ) : (
              ''
            )}
            {connectStatus === 'disconnect' ? <div style={text_styles}>La retrasmisión ha terminado</div> : ''}
            {connectStatus === 'init' ? <div style={text_styles}>Uniéndose al evento...</div> : ''}

            <div style={{ position: 'absolute', top: 4, right: 10 }}>
              <button className="app-twilio-chat-button" onClick={joinAudio}>
                Join Audio
              </button>
            </div>

            {/* <div style={{ position: 'absolute', width: '100%', top: 0 }}>
              <AppBaseAlert
                type={alert.type}
                message={alert.message}
                visible={alert.active}
                close={() => setAlert({ active: false })}
              />
            </div> */}

            <div
              style={{
                position: 'absolute',
                width: '360px',
                height: `${232 * remoteParticipants.length}px`,
                bottom: 2,
                right: 2,
              }}
            >
              {remoteParticipants}
            </div>
          </div>

          <div style={{ width: '100%', height: '95px', background: '#708393' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '103px',
                    height: '85px',
                    marginLeft: '45px',
                  }}
                >
                  {micChooseDlg ? (
                    <div
                      style={{
                        position: 'absolute',
                        width: '400px',
                        height: '270px',
                        borderRadius: '5px',
                        left: '70px',
                        top: '-275px',
                        background: '#708393',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          marginLeft: '22px',
                          marginTop: '22px',
                          fontWeight: '700',
                          fontSize: '14px',
                          lineHeight: '17px',
                          letterSpacing: '0.21px',
                          color: '#FFF',
                        }}
                      >
                        Microfono
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                          style={{
                            width: '90%',
                            height: '1px',
                            backgroundColor: '#FFF',
                            marginTop: '5px',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: '22px',
                          marginTop: '17px',
                          fontWeight: '700',
                          fontSize: '14px',
                          lineHeight: '17px',
                          letterSpacing: '0.21px',
                          color: '#FFF',
                        }}
                      >
                        Altavoces
                      </div>
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
                  {/* <Image
                src="/mic-choose.svg"
                className="cursor-pointer"
                width={16}
                height={13}
                alt="choose"
                onClick={() => showMicList()}
              /> */}
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
                  style={{
                    width: '306px',
                    height: '59px',
                    background: '#F86C6B',
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#FFF',
                    textAlign: 'center',
                    marginLeft: '20px',
                    marginRight: '20px',
                    cursor: 'pointer',
                  }}
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
