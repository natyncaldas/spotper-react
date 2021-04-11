import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { spotperApi } from '../../../services/api'
import './AlbumsPage.scss'

const AlbumsPage = () => {
  
  const [areAlbunsRequested, setAlbunsRequested] = useState(false)
  const dispatch = useDispatch()
  const albums = useSelector(state => state.albums)

  useEffect(() => {

  const requestGetAlbums = async() => {

    await spotperApi.get("/albums").then(response => {
        if(response.status === 200) {
          dispatch({type: 'set', albums: response.data})
          setAlbunsRequested(true)
        }})
  }

  requestGetAlbums()
         
  }, [])
  
  return (
    <>
    <h1>Albums</h1>
    <div className="albums-flex-container">
       {areAlbunsRequested? albums.map( album => (
      <Card style={{ width: '18rem' }} className="album-card" >
        {<Card.Img variant="top" src={album.albumCover}  className="album-image"/>}
        <Card.Body>
          <Card.Title>{album.albumName}</Card.Title>
          {/*<Card.Title>{album.artists[0].name}</Card.Title>
          <Card.Text>{album.copyrights[0].text}</Card.Text>*/}
          <Link to={"/albums/".concat(album.id)} className="btn btn-primary" onClick={()=>dispatch({type: 'set', selectedAlbum: album})}>Go to album</Link>
        </Card.Body>
     </Card>
    )):null}
    </div>
  </>
  )
}

export default AlbumsPage
