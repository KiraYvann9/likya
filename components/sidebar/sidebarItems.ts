import { Href } from 'expo-router';
import {ChartPie, History, Home, LucideIcon, Pill, QrCode, Stethoscope, Ticket, UserRoundCog} from 'lucide-react-native'

interface sidebarItem {
    id: number;
    title: string;
    link: Href;
    icon: LucideIcon,
    permission?: string[]
}

export const sidebarItems: sidebarItem[] = [
    {
        id:  1,
        title: 'Dashboard',
        icon: ChartPie,
        link: "/dashboard",
        permission: ['super-administrateur']
    },
    {
        id:  2,
        title: 'Accueil',
        icon: Home,
        link: "/home",
        permission: ['super-administrateur', 'prestataire']
    },
    {
        id:  3,
        title: 'Historique',
        icon: History,
        link: "/history",
        permission: ['super-administrateur']
    },
    {
        id:  4,
        title: 'Paramètres',
        icon: UserRoundCog,
        link: "/settings",
        permission: ['super-administrateur']
    },
    {
        id:  5,
        title: 'Factures',
        icon: Ticket,
        link: "/invoices",
        permission: ['prestataire']
    },
    {
        id:  6,
        title: 'QRCode',
        icon: QrCode,
        link: "/qrcode",
        permission: ['prestataire']
    },
    {
        id:  7,
        title: 'Services',
        icon: Stethoscope,
        link: "/qrcode",
        permission: ['prestataire']
    },
    {
        id:  8,
        title: 'Medicaments',
        icon: Pill,
        link: "/qrcode",
        permission: ['prestataire']
    },
    
]