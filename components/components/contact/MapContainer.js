import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import googleMapStyles from 'assets/data/GoogleMapStylesData.json'

const MapContainer = props => {
  const { isMobile, locations } = props

  const mapStyles = {
    height: isMobile ? '360px' : '431px',
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

  const hideContact = () => {
    setSelected({})
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
        onClick={selected ? hideContact : null}
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
          <InfoWindow position={selected.location} clickable={true} onCloseClick={hideContact}>
            <p>{selected.name}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer
