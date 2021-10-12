import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const MapContainer = props => {
  const { locations } = props

  const mapStyles = {
    height: '431px',
    width: '100%',
  }

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  }

  const [selected, setSelected] = useState({})

  const onSelect = item => {
    setSelected(item)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {locations.map(item => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
              icon={'/images/marker.png'}
            />
          )
        })}
        {selected.location && (
          <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})}>
            <p>{selected.name}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer
