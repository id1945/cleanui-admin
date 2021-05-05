import React, { Suspense } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = ({ settings }) => ({ routerAnimation: settings.routerAnimation })

const RouterAnimation = ({ location, children, routerAnimation }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        appear
        key={location.pathname}
        classNames={routerAnimation}
        timeout={routerAnimation === 'none' ? 0 : 300}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
}

export default withRouter(connect(mapStateToProps)(RouterAnimation))
