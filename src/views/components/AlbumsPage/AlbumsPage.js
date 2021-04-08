import React , { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import { spotifyApi } from '../../../services/api'
import './AlbumsPage.scss'

const AlbumsPage = () => {
  const [areAlbunsRequested, setAlbunsRequested] = useState(false)
  const [albums, setAlbums] = useState([])

  useEffect(() => {
   
  
  const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
    }
    return hashParams;
   }

  const parametros = getHashParams;
  const token = parametros.access_token;
  
  const requestGetMulitpleAlbuns = async() => {

    let request = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await spotifyApi.get("/albums?ids=2Ij6998NUjQ0BkQ2ipqiET%2C7e6TOKG4POoaQikpefQwbC%2C0ETFjACtuP2ADo6LFhL6HN%2C0PT5m6hwPRrpBwIHVnvbFX%2C1kCHru7uhxBUdzkm4gzRQc%2C5S0nsfYhHa1uz10V4yoWSL%2C1J1yxODbNlqKbwRqJxYJUP%2C6C4TnJuvfxJakuhh2vT0Hh%2C4LH4d3cOWNNsVw41Gqt2kv%2C0bCAjiUamIFqKJsekOYuRw", request)
    .then(response => {
        if(response.status === 200) {
          setAlbums(response.data.albums)
        }})
  }
  
  requestGetMulitpleAlbuns()
  setAlbunsRequested(true)
         
  }, [])

  return (
    <>
    <h1>Albums</h1>
    <div className="albums-flex-container">
       {areAlbunsRequested? albums.map( album => (
      <Card style={{ width: '18rem' }} className="album-card">
      <Card.Img variant="top" src={album.images[0].url}  className="album-image"/>
      <Card.Body>
        <Card.Title>{album.name}</Card.Title>
        <Card.Title>{album.artists[0].name}</Card.Title>
        <Card.Text>{album.copyrights[0].text}</Card.Text>
      </Card.Body>
    </Card>
    )):null}
    </div>
  </>
  )
}

export default AlbumsPage
