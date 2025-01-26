"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import Home from "@/pages/Home/Home";

export default function page() {
	return (
		<DashboardLayout pageTitle="Home">
			<Home />
		</DashboardLayout>
	);
}
