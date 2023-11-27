import {
	HiOutlineViewGrid,
	HiOutlineOfficeBuilding ,
	HiOutlineCheckCircle ,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <HiOutlineViewGrid />
	},
    {
        key: 'customers',
        label: 'Users',
        path: '/admin/usersList',
        icon: <HiOutlineUsers />
    },
	{
		key: 'listings',
		label: 'Listings',
		path: '/admin/listings',
		icon: <HiOutlineOfficeBuilding  />
	},
	{
		key: 'approveListings',
		label: 'Approve Listings',
		path: '/admin/approveListings',
		icon: <HiOutlineCheckCircle  />
	},
	// {
	// 	key: 'transactions',
	// 	label: 'Transactions',
	// 	path: '/transactions',
	// 	icon: <HiOutlineDocumentText />
	// },
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]