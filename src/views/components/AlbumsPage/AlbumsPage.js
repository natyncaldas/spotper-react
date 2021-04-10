import React from 'react'
import {Card} from 'react-bootstrap'
import './AlbumsPage.scss'

const AlbumsPage = (props) => {
  
  return (
    <>
    <h1>Albums</h1>
    <div className="albums-flex-container">
       {props.areAlbunsRequested? props.albums.map( album => (
      <Card style={{ width: '18rem' }} className="album-card">
      {<Card.Img variant="top" src={album.albumCover}  className="album-image"/>}
      <Card.Body>
        <Card.Title>{album.albumName}</Card.Title>
        {/*<Card.Title>{album.artists[0].name}</Card.Title>
        <Card.Text>{album.copyrights[0].text}</Card.Text>*/}
      </Card.Body>
    </Card>
    )):null}
    </div>
  </>
  )
}

export default AlbumsPage
