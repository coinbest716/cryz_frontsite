import React, { useEffect, useState } from 'react'
import Participant from './Participant'
// import PropTypes from 'prop-types'

const Room = props => {
  const { roomName, room, handleLogout } = props
  const [participants, setParticipants] = useState([])

  useEffect(() => {
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
  }, [room])

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ))

  return (
    <div className="app-twilio-chat-room">
      <h3>Room: {roomName}</h3>
      {/* <button className="app-twilio-chat-button" onClick={handleLogout}>
        Log out
      </button> */}
      <div className="app-twilio-chat-local-participant">
        {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ''}
      </div>
      <h4>Remote Participants</h4>
      <div className="app-twilio-chat-remote-participants">{remoteParticipants}</div>
    </div>
  )
}

// Room.propTypes = {
//   roomName: PropTypes.string,
//   room: PropTypes.object,
//   handleLogout: PropTypes.func,
// }

export default Room
