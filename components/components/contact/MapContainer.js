import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import googleMapStyles from 'assets/data/GoogleMapStylesData.json'

const MapContainer = props => {
  const { locations } = props

  const mapStyles = {
    height: '431px',
    width: '100%',
  }

  const defaultCenter = {
    lat: 40.5186797,
    lng: -3.6508627,
  }

  const [selected, setSelected] = useState({})

  const onSelect = item => {
    setSelected(item)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={17}
        center={defaultCenter}
        options={{
          // fullscreenControl: false,
          // zoomControl: false,
          scrollwheel: true,
          // streetViewControl: false,
          // mapTypeControl: false,
          styles: googleMapStyles,
        }}
      >
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
