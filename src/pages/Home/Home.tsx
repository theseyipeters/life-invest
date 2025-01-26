import { getStockData } from "@/lib/finnhub";
import { Stock } from "@/types/stockTypes";
import {
	Badge,
	Card,
	Center,
	Flex,
	Loader,
	Select,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
} from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export default function Home() {
	const [topStocks, setTopStocks] = useState<Stock[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const stocks = await getStockData();
				setTopStocks(stocks);
				if (stocks.length > 0) {
					setSelectedStock(stocks[0]);
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching top stocks:", error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);
	return (
		<div className="w-full flex flex-row gap-4 h-full">
			<div className="w-[70%] overflow-auto bg-white p-6 rounded-lg shadow-md">
				<Stack>
					<Text
						fz={20}
						fw={700}>
						Welcome back, Michael👋🏾
					</Text>
					<Stack gap={30}>
						<Stack gap={15}>
							<h1 className="text-base text-black/40 font-medium">
								Recently viewed
							</h1>

							<SimpleGrid cols={3}>
								{Array(3)
									.fill(0)
									.map((item, index) => (
										<Skeleton
											key={index}
											h={300}
											animate
										/>
									))}
							</SimpleGrid>
						</Stack>

						<Stack gap={15}>
							<h1 className="text-base text-black/40 font-medium">Charts</h1>

							<div className="w-[150px]">
								<Select
									placeholder="Select a stock"
									data={topStocks.map((stock) => ({
										value: stock.symbol,
										label: stock.name,
									}))}
									value={selectedStock?.symbol}
									onChange={(value) =>
										setSelectedStock(
											topStocks.find((stock) => stock.symbol === value) || null
										)
									}
								/>
							</div>
							<Card>Charts placeholder</Card>
						</Stack>

						<Stack gap={15}>
							<div className="flex w-full justify-between items-center">
								<h1 className="text-base text-black/40 font-medium">
									Top stocks
								</h1>
								<button className="w-fit bg-black py-2 px-6 rounded-md text-white text-base">
									View all
								</button>
							</div>
							{topStocks.length > 0 ? (
								<table className="w-full bg-white rounded-lg shadow-md">
									<thead className="bg-gray-100/60">
										<tr>
											<th className="p-2 text-left font-medium">Name</th>
											<th className="p-2 text-left font-medium">Symbol</th>
											<th className="p-2 text-left font-medium">Price</th>
											<th className="p-2 text-left font-medium">Change</th>
											<th className="p-2 text-left font-medium">High</th>
											<th className="p-2 text-left font-medium">Low</th>
										</tr>
									</thead>
									<tbody>
										<>
											{topStocks.map((stock, index) => (
												<tr
													key={index}
													className="text-center w-full">
													<td className="p-2 text-left hover:underline transition-all duration-300">
														<Link href={stock.website}>{stock.name}</Link>
													</td>
													<td className="p-2 text-left">{stock.symbol}</td>
													<td className="p-2 text-left">
														${stock.price.toFixed(2)}
													</td>
													<td
														className={`p-2 text-left ${
															stock.change >= 0
																? "text-green-500"
																: "text-red-500"
														}`}>
														<Badge
															variant="filled"
															color={stock.change >= 0 ? "#E9FFE3" : "#FFDFDF"}>
															<Flex
																fz={12}
																fw={400}
																c={stock.change >= 0 ? "#2AB500" : "#FF4646"}
																align={"center"}
																gap={10}>
																{stock.change.toFixed(2)} ({stock.changePercent}
																%)
																{stock.change >= 0 ? (
																	<FiTrendingUp size={10} />
																) : (
																	<FiTrendingDown size={10} />
																)}
															</Flex>
														</Badge>
													</td>
													<td className="p-2 text-left">
														${stock.high.toFixed(2)}
													</td>
													<td className="p-2 text-left">
														${stock.low.toFixed(2)}
													</td>
												</tr>
											))}
										</>
									</tbody>
								</table>
							) : (
								<Center
									className="border w-full"
									py={40}>
									<Loader
										size={"xs"}
										color="black"
									/>
								</Center>
							)}
						</Stack>
					</Stack>
				</Stack>
			</div>
			<div className="rounded-lg w-[30%] h-full border"></div>
		</div>
	);
}
