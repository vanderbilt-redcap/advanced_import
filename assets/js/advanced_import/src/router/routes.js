/**
 * components are lazy loaded as the routes are visited
 */

const routes = [
    { path: '/', component: () => import('@/layouts/MainLayout'),
        children: [
            { path: '', name: 'home', component: () => import('@/pages/Home') },
            { path: 'logs', name: 'logs', component: () => import('@/pages/Logs') },
            { path: 'jobs', name: 'jobs', component: () => import('@/pages/Jobs') },
            { path: 'test', name: 'test', component: () => import('@/pages/Test') },
            { path: 'import', name: 'import', component: () => import('@/pages/import/Index') },
            { path: 'export', name: 'export', component: () => import('@/pages/export/Index') },
            { path: "*", name: 'not_found', component: () => import('@/pages/PageNotFound')  }
        ]
    }
]

export default routes