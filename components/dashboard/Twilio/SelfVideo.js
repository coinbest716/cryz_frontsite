import React, { useState, useEffect, useRef } from 'react'
// import PropTypes from 'prop-types'

const SelfVideo = props => {
  const { participant, width, height, cameraEnabled, audioEnabled } = props

  const [videoTracks, setVideoTracks] = useState([])
  const [audioTracks, setAudioTracks] = useState([])

  const videoRef = useRef()
  const audioRef = useRef()

  const trackpubsToTracks = trackMap =>
    Array.from(trackMap.values())
      .map(publication => publication.track)
      .filter(track => track !== null)

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks))
    setAudioTracks(trackpubsToTracks(participant.audioTracks))

    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track])
      } else if (track.kind === 'audio') {
        setAudioTracks(audioTracks => [...audioTracks, track])
      }
    }

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track))
      } else if (track.kind === 'audio') {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track))
      }
    }

    participant.on('trackSubscribed', trackSubscribed)
    participant.on('trackUnsubscribed', trackUnsubscribed)

    return () => {
      setVideoTracks([])
      setAudioTracks([])
      participant.removeAllListeners()
    }
  }, [participant])

  useEffect(() => {
    const videoTrack = videoTracks[0]
    if (videoTrack) {
      videoTrack.attach(videoRef.current)
      return () => {
        videoTrack.detach()
      }
    }
  }, [videoTracks])

  useEffect(() => {
    const audioTrack = audioTracks[0]
    if (audioTrack) {
      audioTrack.attach(audioRef.current)
      return () => {
        audioTrack.detach()
      }
    }
  }, [audioTracks])

  useEffect(() => {
    const videoTrack = videoTracks[0]
    if (cameraEnabled) {
      if (videoTrack) {
        videoTrack.attach(videoRef.current)
      }
    } else {
      videoTrack.detach()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraEnabled])

  useEffect(() => {
    const audioTrack = audioTracks[0]
    if (audioEnabled) {
      if (audioTrack) {
        audioTrack.attach(audioRef.current)
      }
    } else {
      audioTrack.detach()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioEnabled])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {cameraEnabled ? (
        <video style={{ width: `${width}px`, height: `${height}px` }} ref={videoRef} autoPlay={true} />
      ) : (
        <></>
      )}

      {audioEnabled ? <audio ref={audioRef} autoPlay={true} muted={false} /> : <></>}
    </div>
  )
}

// SelfVideo.propTypes = {
//   participant: PropTypes.object,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   cameraEnabled: PropTypes.bool,
//   audioEnabled: PropTypes.bool,
// }

export default SelfVideo
