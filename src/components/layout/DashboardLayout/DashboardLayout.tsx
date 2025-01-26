import { LifeInvestLogo } from "@/svgs/svgs";
import {
	AppShell,
	Burger,
	Group,
	ScrollArea,
	Skeleton,
	Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const DashboardLayout: React.FC<{
	children: React.ReactNode;
	pageTitle: string;
}> = ({ children, pageTitle }) => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 70 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md">
			<AppShell.Header>
				<Group
					h="100%"
					px="md">
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom="sm"
						size="sm"
					/>
					<div className="w-[130px]">
						<LifeInvestLogo />
					</div>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar
				p="md"
				withBorder={false}
				bg={"#F4F6FA"}>
				<AppShell.Section
					grow
					my="md"
					component={ScrollArea}>
					{Array(4)
						.fill(0)
						.map((_, index) => (
							<Skeleton
								key={index}
								h={28}
								mt="sm"
								animate={true}
							/>
						))}
				</AppShell.Section>
				<AppShell.Section>
					<Text>LifeInvest v1.0</Text>
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main className="h-screen bg-[#F4F6FA]">
				{children}
			</AppShell.Main>
		</AppShell>
	);
};
