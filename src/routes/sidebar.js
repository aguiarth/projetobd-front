/** Icons are imported separatly to reduce build time */
// import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import { BanknotesIcon, TagIcon } from '@heroicons/react/24/solid';
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import BuildingOfficeIcon from '@heroicons/react/24/outline/BuildingOfficeIcon'
import ArchiveBoxIcon from '@heroicons/react/24/outline/ArchiveBoxIcon'
import ClipboardDocumentIcon from '@heroicons/react/24/outline/ClipboardDocumentIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/financeiros', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Financeiro', // name that appear in Sidebar
  },
  {
    path: '/app/materiaPrima', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Materia Prima', // name that appear in Sidebar
  },
  {
    path: '/app/produtoAcabado', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Produto Acabado', // name that appear in Sidebar
  },
  {
    path: '/app/lote', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Lote', // name that appear in Sidebar
  },
  {
    path: '/app/expedicao', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Expedição', // name that appear in Sidebar
  },
  {
    path: '/app/entrega', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Entrega', // name that appear in Sidebar
  },
  {
    path: '/app/ordemProducao', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Ordem Produção', // name that appear in Sidebar
  },
  {
    path: '/app/estoque', // url
    icon: <ArchiveBoxIcon className={iconClasses}/>, // icon component
    name: 'Estoque', // name that appear in Sidebar
  },
  {
    path: '', // url 
    icon: <WalletIcon className={`${iconClasses} inline` } />, // icon component
    name: 'Painel de Contas', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/Contas', 
        icon: <BanknotesIcon className={submenuIconClasses}/>,
        name: 'Contas',
      },
      {
        path: '/app/ContasReceber', //ALTERAR
        icon: <CreditCardIcon className={submenuIconClasses}/>,
        name: 'Contas a Receber',
      },
      {
        path: '/app/ContasPagar', //ALTERAR
        icon: <TagIcon className={submenuIconClasses}/>,
        name: 'Contas a Pagar',
      },
    ]
  },
  {
    path: '/app/cliente', // url
    icon: <UserIcon className={iconClasses}/>, // icon component
    name: 'Cliente', // name that appear in Sidebar
  },
  {
    path: '/app/fornecedor', // url
    icon: <BuildingOfficeIcon className={iconClasses}/>, // icon component
    name: 'Fornecedor', // name that appear in Sidebar
  },
  {
    path: '/app/pedido', // url
    icon: <ClipboardDocumentIcon className={iconClasses}/>, // icon component
    name: 'Pedido', // name that appear in Sidebar
  },
  {
    path: '/app/charts', // url
    icon: <ChartBarIcon className={iconClasses}/>, // icon component
    name: 'Analytics', // name that appear in Sidebar
  },
  {
    path: '/app/integration', // url
    icon: <BoltIcon className={iconClasses}/>, // icon component
    name: 'Integration', // name that appear in Sidebar
  },
  {
    path: '/app/calendar', // url
    icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
    name: 'Calendar', // name that appear in Sidebar
  },

  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Pages', // name that appear in Sidebar
    submenu : [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Login',
      },
      {
        path: '/register', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Register', // name that appear in Sidebar
      },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses}/>,
        name: 'Forgot Password',
      },
      {
        path: '/app/blank',
        icon: <DocumentIcon className={submenuIconClasses}/>,
        name: 'Blank Page',
      },
      {
        path: '/app/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
        name: '404',
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Billing',
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Team Members', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Documentation', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
        name: 'Getting Started', // name that appear in Sidebar
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses}/>, 
        name: 'Features',
      },
      {
        path: '/app/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
        name: 'Components',
      }
    ]
  },
  
]

export default routes


