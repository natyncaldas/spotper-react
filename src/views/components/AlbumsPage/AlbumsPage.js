import React, {useState, useEffect} from 'react'
import {Card, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { spotperApi } from '../../../services/api'
import './AlbumsPage.scss'

const AlbumsPage = () => {
  
  const [areAlbunsRequested, setAlbunsRequested] = useState(false)
  const albums = useSelector(state => state.albums)
  const dispatch = useDispatch()

  useEffect(() => {

  const requestGetAlbums = async() => {

    await spotperApi.get("/albums").then(response => {
        if(response.status === 200) {
          dispatch({type: 'set', albums: response.data})
          setAlbunsRequested(true)
        }})
  }

  requestGetAlbums()
         
  }, [dispatch])
  
  return (
    <>
    <h1>Albums</h1>
    <div className="albums-flex-container">
    {areAlbunsRequested? albums.map( album => (
      <Card style={{ width: '18rem' }} className="album-card" >
        {<Card.Img variant="top" src={album.albumCover}  className="album-image"/>}
        <Card.Body>
          <Card.Title>{album.albumName}</Card.Title>
          <Card.Text>{album.recordingDate.substr(0, 10).replaceAll('-', '/')}</Card.Text>
          <Link to={"/albums/".concat(album.id)} className="album-btn btn btn-primary" onClick={()=>dispatch({type: 'set', selectedAlbum: album})}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24"  fill="currentColor" class="bi bi-disc-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0zm9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5z"/>
            </svg>
            <span className="album-btn-text">Go to album</span>
          </Link>
        </Card.Body>
     </Card>
    ))
    :<Spinner animation="border" variant="success" className="centered"/>}
    </div>
  </>
  )
}

export default AlbumsPage
