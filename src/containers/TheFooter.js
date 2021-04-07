import React from 'react'
import {CFooter} from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter className="footer" fixed={false}>
      <div>
        <span className="ml-1">&copy; 2021 Amanda Cavalcante, Natália Caldas & Rodrigo Nogueira.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
