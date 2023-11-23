import React, { useEffect, useState } from 'react'
import { Marker, Popup,useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from '../assets/icons/placeholder.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import * as ELG from 'esri-leaflet-geocoder'

let defaultIcon = L.icon({
  iconUrl : icon,
  shadowUrl : iconShadow,
  iconSize : [28,28]
})

L.Marker.prototype.options.icon = defaultIcon

const GeoCoderMarker = ({address}) => {
  console.log(address,'here the address')
    const map = useMap()
    const [position,setPosition] = useState([60,19]) 

    useEffect(()=>{
      ELG.geocode().text(address).run((err, results, response)=>{
        if(results?.results?.length > 0){
          const  {lat,lng} = results?.results[0].latlng
          setPosition([lat,lng])
          map.flyTo([lat, lng],6)
        }
      })
    },[address])
  return (
    <div>
      <Marker position={position} icon={defaultIcon}>
      <Popup>
        {address}
      </Popup>
    </Marker>
    </div>
  )
}

export default GeoCoderMarker