import React, { useState, useEffect, useRef } from 'react'

const Participant = props => {
  // variables
  const { participant } = props
  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop

  const [videoTracks, setVideoTracks] = useState([])
  const [audioTracks, setAudioTracks] = useState([])

  const videoRef = useRef()
  const audioRef = useRef()
  // handlers
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setViewport('desktop')
    } else if (window.innerWidth === 1024) {
      setViewport('ipad')
    } else {
      setViewport('mobile')
    }
  }, [])

  useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 1024) {
        setViewport('desktop')
      } else if (window.innerWidth === 1024) {
        setViewport('ipad')
      } else {
        setViewport('mobile')
      }
    }
    window.addEventListener('resize', resizeFunction)
  }, [])

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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#000',
        border: '1px solid #C4C4C4',
        marginTop: '4px',
      }}
    >
      <video
        style={{ width: viewport === 'mobile' ? '120px' : '360px', height: viewport === 'mobile' ? '120px' : '227px' }}
        ref={videoRef}
        autoPlay={true}
      />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </div>
  )
}

// Participant.propTypes = {
//   participant: PropTypes.object,
// }

export default Participant
