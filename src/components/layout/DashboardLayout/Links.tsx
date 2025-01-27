import React from "react";
import Link from "next/link";
import { FiSearch, FiList, FiUser, FiBell } from "react-icons/fi";
import { Group, Text } from "@mantine/core";
import { RiDashboardLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

type NavLinkType = {
	label: string;
	icon: React.ReactNode;
	href: string;
};

const NAVLINKS: NavLinkType[] = [
	{
		label: "Dashboard",
		icon: (
			<RiDashboardLine
				size={25}
				stroke="0.1px"
			/>
		),
		href: "/",
	},
	{ label: "Search Stocks", icon: <FiSearch size={20} />, href: "/search" },
	{ label: "Portfolio", icon: <FiList size={20} />, href: "/portfolio" },
	{
		label: "Watchlist & Alerts",
		icon: <FiBell size={20} />,
		href: "/watchlist",
	},
	{ label: "Account", icon: <FiUser size={20} />, href: "/account" },
];

const Links: React.FC = () => {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-1">
			{NAVLINKS.map((link) => {
				const isActive = pathname === link.href;

				return (
					<Link
						key={link.href}
						href={link.href}>
						<Group
							className={`py-3 px-4 rounded-md transition-all duration-500 ${
								isActive ? "bg-white" : "hover:bg-white hover:shadow-sm"
							}`}>
							<div className={`${isActive ? "text-[#115DFC]" : ""}`}>
								{link.icon}
							</div>
							<Text
								fw={isActive ? 600 : 400}
								c={isActive ? "#115DFC" : "black"}>
								{link.label}
							</Text>
						</Group>
					</Link>
				);
			})}
		</div>
	);
};

export default Links;
