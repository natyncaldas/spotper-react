import React, {Suspense} from 'react'
import {CContainer, CFade} from '@coreui/react'
import {Redirect, Route, Switch} from 'react-router-dom'

import AlbumsPage from 'src/views/components/AlbumsPage/AlbumsPage'
import PlaylistsPage from 'src/views/components/PlaylistsPage/PlaylistsPage'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)

const TheContent = () => {
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
                  <AlbumsPage {...props} />
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
