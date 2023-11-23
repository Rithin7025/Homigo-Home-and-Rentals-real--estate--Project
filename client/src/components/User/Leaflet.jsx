import { MapContainer } from 'react-leaflet'
import {Marker,Popup ,TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import GeoCoderMarker from '../../GeoCoderMarker/geoCoderMarker'

function Leaflet({address , city, country,district}) { 
    console.log(address,city,country) 
    const position = [9.8422, 77.2046]    

  return (
    <MapContainer className='h-40' center={[53.35,18.8]} zoom={13} scrollWheelZoom={false}>

    <TileLayer 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      
    />
   <GeoCoderMarker address={`${address} ${city} ${district} ${country} `} />
    
  </MapContainer>
  )
}

export default Leaflet