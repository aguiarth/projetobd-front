// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const FinanceirosPage = lazy(() => import('../pages/protected/FinanceirosPage'))
const MateriaPrimaPage = lazy(() => import('../pages/protected/MateriaPrimaPage'))
const ProdutoAcabadoPage = lazy(() => import('../pages/protected/ProdutoAcabadoPage'))
const LotePage = lazy(() => import('../pages/protected/LotePage'))
const ExpedicaoPage = lazy(() => import('../pages/protected/ExpedicaoPage'))
const EntregaPage = lazy(() => import('../pages/protected/EntregaPage'))
const OrdemProducaoPage = lazy(() => import('../pages/protected/OrdemProducaoPage'))
const EstoquePage = lazy(() => import('../pages/protected/EstoquePage'))
const ContaPage = lazy(() => import('../pages/protected/ContaPage'))
const ContaReceberPage = lazy(() => import('../pages/protected/ContaReceberPage'))
const ContaPagarPage = lazy(() => import('../pages/protected/ContaPagarPage'))
const ClientePage = lazy(() => import('../pages/protected/ClientePage'))
const FornecedorPage = lazy(() => import('../pages/protected/FornecedorPage'))
const PedidoPage = lazy(() => import('../pages/protected/PedidoPage'))



const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/financeiros',
    component: FinanceirosPage,
  },
  {
    path: '/fornecedor',
    component: FornecedorPage,
  },
  {
    path: '/pedido',
    component: PedidoPage,
  },
  {
    path: '/materiaPrima',
    component: MateriaPrimaPage,
  },
  {
    path: '/produtoAcabado',
    component: ProdutoAcabadoPage,
  },
  {
    path: '/lote',
    component: LotePage,
  },
  {
    path: '/expedicao',
    component: ExpedicaoPage,
  },
  {
    path: '/entrega',
    component: EntregaPage,
  },
  {
    path: '/ordemProducao',
    component: OrdemProducaoPage,
  },
  {
    path: '/estoque',
    component: EstoquePage,
  },
  {
    path: '/contas',
    component: ContaPage,
  },
  {
    path: '/contasReceber',
    component: ContaReceberPage,
  },
  {
    path: '/contasPagar',
    component: ContaPagarPage,
  },
  {
    path: '/cliente',
    component: ClientePage,
  }
]

export default routes
