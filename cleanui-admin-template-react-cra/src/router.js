import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // Dashboards
  {
    path: '/dashboard/alpha',
    Component: lazy(() => import('pages/dashboard/alpha')),
    exact: true,
  },
  {
    path: '/dashboard/beta',
    Component: lazy(() => import('pages/dashboard/beta')),
    exact: true,
  },
  {
    path: '/dashboard/gamma',
    Component: lazy(() => import('pages/dashboard/gamma')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    Component: lazy(() => import('pages/dashboard/crypto')),
    exact: true,
  },

  // Ecommerce
  {
    path: '/ecommerce/dashboard',
    Component: lazy(() => import('pages/ecommerce/dashboard')),
    exact: true,
  },
  {
    path: '/ecommerce/orders',
    Component: lazy(() => import('pages/ecommerce/orders')),
    exact: true,
  },
  {
    path: '/ecommerce/product-catalog',
    Component: lazy(() => import('pages/ecommerce/product-catalog')),
    exact: true,
  },
  {
    path: '/ecommerce/product-details',
    Component: lazy(() => import('pages/ecommerce/product-details')),
    exact: true,
  },
  {
    path: '/ecommerce/cart',
    Component: lazy(() => import('pages/ecommerce/cart')),
    exact: true,
  },

  // Apps
  {
    path: '/apps/messaging',
    Component: lazy(() => import('pages/apps/messaging')),
    exact: true,
  },
  {
    path: '/apps/calendar',
    Component: lazy(() => import('pages/apps/calendar')),
    exact: true,
  },
  {
    path: '/apps/mail',
    Component: lazy(() => import('pages/apps/mail')),
    exact: true,
  },
  {
    path: '/apps/profile',
    Component: lazy(() => import('pages/apps/profile')),
    exact: true,
  },
  {
    path: '/apps/gallery',
    Component: lazy(() => import('pages/apps/gallery')),
    exact: true,
  },
  // Extra Apps
  {
    path: '/apps/github-explore',
    Component: lazy(() => import('pages/apps/github-explore')),
    exact: true,
  },
  {
    path: '/apps/github-discuss',
    Component: lazy(() => import('pages/apps/github-discuss')),
    exact: true,
  },
  {
    path: '/apps/digitalocean-droplets',
    Component: lazy(() => import('pages/apps/digitalocean-droplets')),
    exact: true,
  },
  {
    path: '/apps/digitalocean-create',
    Component: lazy(() => import('pages/apps/digitalocean-create')),
    exact: true,
  },
  {
    path: '/apps/google-analytics',
    Component: lazy(() => import('pages/apps/google-analytics')),
    exact: true,
  },
  {
    path: '/apps/wordpress-post',
    Component: lazy(() => import('pages/apps/wordpress-post')),
    exact: true,
  },
  {
    path: '/apps/wordpress-posts',
    Component: lazy(() => import('pages/apps/wordpress-posts')),
    exact: true,
  },
  {
    path: '/apps/wordpress-add',
    Component: lazy(() => import('pages/apps/wordpress-add')),
    exact: true,
  },
  {
    path: '/apps/todoist-list',
    Component: lazy(() => import('pages/apps/todoist-list')),
    exact: true,
  },
  {
    path: '/apps/jira-dashboard',
    Component: lazy(() => import('pages/apps/jira-dashboard')),
    exact: true,
  },
  {
    path: '/apps/jira-agile-board',
    Component: lazy(() => import('pages/apps/jira-agile-board')),
    exact: true,
  },
  {
    path: '/apps/helpdesk-dashboard',
    Component: lazy(() => import('pages/apps/helpdesk-dashboard')),
    exact: true,
  },
  // Widgets
  {
    path: '/widgets/general',
    Component: lazy(() => import('pages/widgets/general')),
    exact: true,
  },
  {
    path: '/widgets/lists',
    Component: lazy(() => import('pages/widgets/lists')),
    exact: true,
  },
  {
    path: '/widgets/tables',
    Component: lazy(() => import('pages/widgets/tables')),
    exact: true,
  },
  {
    path: '/widgets/charts',
    Component: lazy(() => import('pages/widgets/charts')),
    exact: true,
  },
  // Cards
  {
    path: '/cards/basic-cards',
    Component: lazy(() => import('pages/cards/basic-cards')),
    exact: true,
  },
  {
    path: '/cards/tabbed-cards',
    Component: lazy(() => import('pages/cards/tabbed-cards')),
    exact: true,
  },
  // UI Kits
  {
    path: '/ui-kits/bootstrap',
    Component: lazy(() => import('pages/ui-kits/bootstrap')),
    exact: true,
  },
  {
    path: '/ui-kits/antd',
    Component: lazy(() => import('pages/ui-kits/antd')),
    exact: true,
  },
  // Tables
  {
    path: '/tables/bootstrap',
    Component: lazy(() => import('pages/tables/bootstrap')),
    exact: true,
  },
  {
    path: '/tables/antd',
    Component: lazy(() => import('pages/tables/antd')),
    exact: true,
  },
  // Charts
  {
    path: '/charts/chartistjs',
    Component: lazy(() => import('pages/charts/chartistjs')),
    exact: true,
  },
  {
    path: '/charts/chartjs',
    Component: lazy(() => import('pages/charts/chartjs')),
    exact: true,
  },
  {
    path: '/charts/c3',
    Component: lazy(() => import('pages/charts/c3')),
    exact: true,
  },
  // Icons
  {
    path: '/icons/feather-icons',
    Component: lazy(() => import('pages/icons/feather-icons')),
    exact: true,
  },
  {
    path: '/icons/fontawesome',
    Component: lazy(() => import('pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linearicons-free',
    Component: lazy(() => import('pages/icons/linearicons-free')),
    exact: true,
  },
  {
    path: '/icons/icomoon-free',
    Component: lazy(() => import('pages/icons/icomoon-free')),
    exact: true,
  },
  // Advanced
  {
    path: '/advanced/form-examples',
    Component: lazy(() => import('pages/advanced/form-examples')),
    exact: true,
  },
  {
    path: '/advanced/email-templates',
    Component: lazy(() => import('pages/advanced/email-templates')),
    exact: true,
  },
  {
    path: '/advanced/utilities',
    Component: lazy(() => import('pages/advanced/utilities')),
    exact: true,
  },
  {
    path: '/advanced/grid',
    Component: lazy(() => import('pages/advanced/grid')),
    exact: true,
  },
  {
    path: '/advanced/typography',
    Component: lazy(() => import('pages/advanced/typography')),
    exact: true,
  },
  {
    path: '/advanced/pricing-tables',
    Component: lazy(() => import('pages/advanced/pricing-tables')),
    exact: true,
  },
  {
    path: '/advanced/invoice',
    Component: lazy(() => import('pages/advanced/invoice')),
    exact: true,
  },
  {
    path: '/advanced/colors',
    Component: lazy(() => import('pages/advanced/colors')),
    exact: true,
  },
  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={state => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/dashboard/alpha" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
