import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Albums',
    to: '/dashboard',
    icon: <CIcon name="cil-music-note" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Playlists',
    to: '/dashboard',
    icon: <CIcon name="cil-music-note" customClasses="c-sidebar-nav-icon"/>
  }
]

export default _nav
