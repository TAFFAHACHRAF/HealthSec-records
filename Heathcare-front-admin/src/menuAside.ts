import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
  mdiDoctor,
  mdiMedication,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: mdiTable,
  },
  {
    href: '/doctors',
    label: 'Doctors',
    icon: mdiMedication,
  },  
  {
    href: '/patients',
    label: 'Patients',
    icon: mdiDoctor,
  },
  {
    href: '/tables',
    label: 'Tables',
    icon: mdiTable,
  },
  {
    href: '/forms',
    label: 'Forms',
    icon: mdiSquareEditOutline,
  },
  {
    href: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/responsive',
    label: 'Responsive',
    icon: mdiResponsive,
  },
  {
    href: '/',
    label: 'Styles',
    icon: mdiPalette,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: '/login',
    label: 'Login',
    icon: mdiLock,
  },
  {
    href: '/error',
    label: 'Error',
    icon: mdiAlertCircle,
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One',
      },
      {
        label: 'Item Two',
      },
    ],
  },
  {
    href: 'https://github.com/justboil/healthcare-system',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank',
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'Vue version',
    icon: mdiVuejs,
    target: '_blank',
  },
]

export default menuAside
