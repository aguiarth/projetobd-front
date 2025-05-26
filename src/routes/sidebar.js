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
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { GiAxeInStump } from "react-icons/gi";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { Gi3dHammer } from "react-icons/gi";
import { GiBoxUnpacking } from "react-icons/gi";
import { BsBasket3Fill } from "react-icons/bs";
import { GiCaravan } from "react-icons/gi";
import { GiCargoShip } from "react-icons/gi";
import { GiChart } from "react-icons/gi";
import { GiCoins } from "react-icons/gi";
import { GiCoinflip } from "react-icons/gi";
import { GiPresent } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  {
    path: '/app/financeiros', // url
    icon: <FaMoneyBill className={iconClasses} />, // icon component
    name: 'Financeiro', // name that appear in Sidebar
  },
  {
    path: '/app/materiaPrima', // url
    icon: <HiMiniRectangleGroup className={iconClasses} />, // icon component
    name: 'Materia Prima', // name that appear in Sidebar
  },
  {
    path: '/app/ordemProducao', // url
    icon: <GiAxeInStump className={iconClasses} />, // icon component
    name: 'Ordem Produção', // name that appear in Sidebar
  },
  {
    path: '/app/produtoAcabado', // url
    icon: <Gi3dHammer className={iconClasses} />, // icon component
    name: 'Produto Acabado', // name that appear in Sidebar
  },
  {
    path: '/app/lote', // url
    icon: <GiCardboardBoxClosed className={iconClasses} />, // icon component
    name: 'Lote', // name that appear in Sidebar
  },
  {
    path: '/app/estoque', // url
    icon: <BsBasket3Fill className={iconClasses} />, // icon component
    name: 'Estoque', // name that appear in Sidebar
  },
  {
    path: '', // url 
    icon: <GiCaravan className={`${iconClasses} inline`} />, // icon component
    name: 'Expedição e Entrega', // name that appear in Sidebar
    submenu: [
      {
      path: '/app/expedicao', // url
      icon: <GiCargoShip className={iconClasses} />, // icon component
      name: 'Expedição', // name that appear in Sidebar
    },
    {
      path: '/app/entrega', // url
      icon: <GiBoxUnpacking className={iconClasses} />, // icon component
      name: 'Entrega', // name that appear in Sidebar
    },
    ]
  },
  {
    path: '', // url 
    icon: <GiChart className={`${iconClasses} inline`} />, // icon component
    name: 'Painel de Contas', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/Contas',
        icon: <BanknotesIcon className={submenuIconClasses} />,
        name: 'Contas',
      },
      {
        path: '/app/ContasReceber', //ALTERAR
        icon: <GiCoins className={submenuIconClasses} />,
        name: 'Contas a Receber',
      },
      {
        path: '/app/ContasPagar', //ALTERAR
        icon: <GiCoinflip className={submenuIconClasses} />,
        name: 'Contas a Pagar',
      },
    ]
  },
  {
    path: '/app/cliente', // url
    icon: <FaUser className={iconClasses} />, // icon component
    name: 'Cliente', // name that appear in Sidebar
  },
  {
    path: '/app/fornecedor', // url
    icon: <FaBuilding className={iconClasses} />, // icon component
    name: 'Fornecedor', // name that appear in Sidebar
  },
  {
    path: '/app/pedido', // url
    icon: <GiPresent className={iconClasses} />, // icon component
    name: 'Pedido', // name that appear in Sidebar
  }


]

export default routes