import { DashboardLayout } from "@/components/layout/DashboardLayout/DashboardLayout";
import Home from "@/app/Home/Home";

export default function page() {
	return (
		<DashboardLayout pageTitle="Home">
			<Home />
		</DashboardLayout>
	);
}
