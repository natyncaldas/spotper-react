import React, {Suspense, useState, useEffect} from 'react'
import {CContainer, CFade} from '@coreui/react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import AlbumsPage from 'src/views/components/AlbumsPage/AlbumsPage'
import PlaylistsPage from 'src/views/components/PlaylistsPage/PlaylistsPage'
import { spotifyApi } from '../services/api'
import { spotperApi } from '../services/api'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)


const TheContent = () => {
const [areAlbunsRequested, setAlbunsRequested] = useState(false)
//const [albums, setAlbums] = useState([])
const dispatch = useDispatch()
const albums = useSelector(state => state.albums)

  useEffect(() => {
   
  /*
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
  
  requestGetMulitpleAlbuns()*/

  const requestGetAlbums = async() => {

    await spotperApi.get("/albums").then(response => {
        if(response.status === 200) {
          //setAlbums(response.data)
          dispatch({type: 'set', albums: response.data})
        }})
  }

  requestGetAlbums()
  setAlbunsRequested(true)
         
  }, [])
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            <Route
              path="/albums"
              name="Albums"
              render={props => (
                <CFade>
                  <AlbumsPage {...props} 
                    albums={albums}
                    areAlbunsRequested={areAlbunsRequested}
                  />
                </CFade>
              )}/>

            <Route
              path="/playlists"
              name="Playlists"
              render={props => (
                <CFade>
                  <PlaylistsPage {...props} />
                </CFade>
              )}/>    
              
            <Redirect from="/" to="/albums"/>
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
