"use client";

import React, { useState, useEffect } from "react";
import { LifeInvestLogo } from "@/svgs/svgs";
import {
	AppShell,
	Burger,
	Group,
	ScrollArea,
	Text,
	Button,
	Flex,
	Avatar,
	Paper,
} from "@mantine/core";
import styles from "./DashboardLayout.module.css";
import {
	Spotlight,
	SpotlightActionData,
	openSpotlight,
} from "@mantine/spotlight";
import {
	useDisclosure,
	useDebouncedValue,
	useMediaQuery,
} from "@mantine/hooks";
import { FiSearch } from "react-icons/fi";
import { searchStocks2 } from "@/lib/finnhub";
import Links from "./Links";
import { IStockResult } from "@/types/stockTypes";
import Link from "next/link";
import StockModal from "@/components/modals/StockModal/StockModal";

export const DashboardLayout: React.FC<{
	children: React.ReactNode;
	pageTitle?: string;
}> = ({ children }) => {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [opened, { toggle }] = useDisclosure();
	const [selectedSymbol, setSelectedSymbol] = useState("");
	const [query, setQuery] = useState("");
	const [debouncedQuery] = useDebouncedValue(query, 300);
	const [actions, setActions] = useState<SpotlightActionData[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchStocks = async () => {
			if (!debouncedQuery) {
				setActions([]);
				return;
			}
			setLoading(true);

			try {
				const response = await searchStocks2(debouncedQuery);
				const bestMatches = response?.result;

				if (bestMatches && Array.isArray(bestMatches)) {
					const stockActions = bestMatches.map((stock: IStockResult) => ({
						id: stock.symbol,
						title: `${stock.description} (${stock.symbol})`,
						description: `Symbol: ${stock.symbol} ${
							stock.type && `- Type: ${stock.type}`
						}`,
						onClick: () => {
							setSelectedSymbol(stock.symbol);
							setShowModal(true);
						},
					}));
					setLoading(false);
					setActions(stockActions);
				} else {
					setLoading(false);
					setActions([]);
				}
			} catch (error) {
				console.error("Error fetching stocks:", error);
				setActions([]);
			} finally {
				setLoading(false);
			}
		};

		fetchStocks();
	}, [debouncedQuery]);

	const items = actions
		.filter((item) =>
			(item.title?.toLowerCase() || "").includes(query.toLowerCase().trim())
		)
		.map((item) => (
			<Spotlight.Action
				classNames={{ action: styles.action }}
				key={item.id}
				onClick={item.onClick}>
				<Group
					wrap="nowrap"
					w="100%">
					<div style={{ flex: 1 }}>
						<Text>{item.title || "Untitled"}</Text>{" "}
						{item.description && (
							<Text
								opacity={0.6}
								size="xs">
								{item.description}
							</Text>
						)}
					</div>
				</Group>
			</Spotlight.Action>
		));

	return (
		<>
			<Spotlight.Root
				maxHeight={600}
				scrollable
				query={query}
				onQueryChange={setQuery}>
				<Spotlight.Search
					placeholder="Search..."
					leftSection={
						<FiSearch
							size={18}
							stroke="1.5"
						/>
					}
				/>
				<Spotlight.ActionsList>
					{loading ? (
						<Spotlight.Empty>Loading...</Spotlight.Empty>
					) : items.length > 0 ? (
						items
					) : (
						<Spotlight.Empty>No results found...</Spotlight.Empty>
					)}
				</Spotlight.ActionsList>
			</Spotlight.Root>

			<AppShell
				header={{ height: 70 }}
				navbar={{
					width: 300,
					breakpoint: "sm",
					collapsed: { mobile: !opened },
				}}
				padding="md">
				<AppShell.Header>
					<Group
						w={"100%"}
						h="100%"
						px="md">
						<Flex
							w={"100%"}
							align="center"
							justify="space-between">
							<Group>
								<Burger
									opened={opened}
									onClick={toggle}
									hiddenFrom="sm"
									size="sm"
								/>
								<div className="w-[100px] md:w-[130px]">
									<LifeInvestLogo />
								</div>
							</Group>
							<Group gap={40}>
								<Paper
									bg={"transparent"}
									withBorder
									w={isMobile ? "fit-content" : 300}
									onClick={openSpotlight}>
									<Button
										classNames={{ root: styles.button_root }}
										bg={"transparent"}
										opacity={0.2}
										c="black"
										ta={"left"}
										fw={400}
										leftSection={<FiSearch size={18} />}
										onClick={openSpotlight}>
										Search
									</Button>
								</Paper>

								{!isMobile ? (
									<Group>
										<Link href={"/"}>API</Link>
										<Link href={"/"}>Documentation</Link>

										<Avatar src={"https://i.pravatar.cc/150?img=60"} />
									</Group>
								) : null}
							</Group>
						</Flex>
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
						<Links />
					</AppShell.Section>
					<AppShell.Section>
						<Text>LifeInvest v1.0</Text>
					</AppShell.Section>
				</AppShell.Navbar>
				<AppShell.Main className="h-screen bg-[#F4F6FA]">
					{children}
				</AppShell.Main>
			</AppShell>

			<StockModal
				symbol={selectedSymbol}
				opened={showModal}
				close={() => setShowModal(false)}
			/>
		</>
	);
};
