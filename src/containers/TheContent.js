import React, {Suspense} from 'react'
import {CContainer, CFade} from '@coreui/react'
import {Redirect, Route, Switch} from 'react-router-dom'

import Dashboard from 'src/views/dashboard/Dashboard'

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
              path="/dashboard"
              name="Dashboard"
              render={props => (
                <CFade>
                  <Dashboard {...props} />
                </CFade>
              )}/>
              
            <Redirect from="/" to="/dashboard"/>
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
