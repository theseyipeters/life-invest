"use client";

import { useEffect, useState } from "react";
import {
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	BarChart,
	Legend,
	Bar,
} from "recharts";
import { getStockData } from "@/lib/finnhub";
import { Stock } from "@/types/stockTypes";
import {
	Card,
	Center,
	SimpleGrid,
	Stack,
	Text,
	Select,
	Flex,
	Badge,
	Skeleton,
	Group,
	Image,
} from "@mantine/core";
import Link from "next/link";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import StockCard2 from "@/components/common/StockCard2/StockCard2";
import { useMediaQuery } from "@mantine/hooks";

export default function Home() {
	const [topStocks, setTopStocks] = useState<Stock[]>([]);
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [filter, setFilter] = useState<string | null>("Today");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const stocks = await getStockData();
				setTopStocks(stocks);
			} catch (error) {
				console.error("Error fetching top stocks:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="w-full flex flex-row gap-4 h-full">
			<div className="w-[100%] overflow-auto bg-white p-3 md:p-6 rounded-lg shadow-md">
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

							{topStocks.length > 0 ? (
								<SimpleGrid cols={{ base: 2, sm: 2, lg: 3 }}>
									{topStocks.slice(0, 6).map((item, index) => (
										<StockCard2
											key={index}
											stock={item}
										/>
									))}
								</SimpleGrid>
							) : (
								<SimpleGrid cols={{ base: 2, sm: 2, lg: 3 }}>
									{Array(3)
										.fill(0)
										.map((item, index) => (
											<Skeleton
												radius={20}
												key={index}
												h={150}
												animate
											/>
										))}
								</SimpleGrid>
							)}
						</Stack>

						<Stack gap={15}>
							<Flex
								align={"center"}
								justify={"space-between"}>
								<h1 className="text-base text-black/40 font-medium">Charts</h1>

								<div className="w-[150px]">
									<Select
										placeholder="Select a stock"
										data={["Today", "Yesterday", "Last 7 days", "Last 30 days"]}
										value={filter}
										onChange={(value) => setFilter(value)}
									/>
								</div>
							</Flex>
							<Card
								w={"100%"}
								h={450}
								px={0}
								pt={20}
								pb={20}>
								{topStocks.length > 0 ? (
									<>
										<ResponsiveContainer
											width="100%"
											height="100%">
											<BarChart
												barSize={30}
												data={
													isMobile
														? topStocks.slice(0, 3)
														: topStocks.slice(0, 6)
												}>
												<CartesianGrid opacity={0.2} />
												<XAxis
													dataKey="symbol"
													strokeOpacity="0"
												/>
												<YAxis strokeOpacity="0" />
												<Tooltip />
												<Legend
													wrapperStyle={{
														bottom: 0,
														right: 0,
														borderRadius: 3,
														lineHeight: "40px",
														fontSize: "16px",
														color: "#000",
													}}
													iconSize={10}
												/>
												<Bar
													dataKey="high"
													fill="#115DFC"
													name="High Price"
													radius={4}
													width={10}
												/>

												<Bar
													dataKey="low"
													fill="#BAEEFF"
													name="Low Price"
													radius={4}
													width={10}
												/>
											</BarChart>
										</ResponsiveContainer>
									</>
								) : (
									<Center
										className="w-full"
										py={40}>
										<Skeleton
											animate
											h={400}
										/>
									</Center>
								)}
							</Card>
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
								<table className="w-full bg-white rounded-lg border-collapse">
									<thead className="border-b">
										<tr>
											<th className="p-3 text-left font-medium">Name</th>
											<th className="p-3 text-left font-medium">Symbol</th>
											<th className="p-3 text-left font-medium">Price</th>
											<th className="p-3 text-left font-medium">High</th>
											<th className="p-3 text-left font-medium">Low</th>
											<th className="p-3 text-left font-medium">Change</th>
										</tr>
									</thead>
									<tbody>
										{topStocks.map((stock, index) => (
											<tr
												key={index}
												className={`text-center h-[60px] w-full ${
													index % 2 === 0 ? "bg-gray-50" : "bg-white"
												}`}>
												<td className="p-3 text-left hover:underline transition-all duration-300 font-medium ">
													<Group>
														<div className="w-[20px] h-[20px] md:h-[30px] md:w-[30px] rounded-full">
															<Image
																radius={150}
																src={stock.logo}
																alt={`${stock.symbol} logo`}
															/>
														</div>
														<Link
															target="_blank"
															href={stock.website}>
															{stock.name}.
														</Link>
													</Group>
												</td>
												<td className="p-3 text-left">{stock.symbol}</td>
												<td className="p-3 text-left">
													${stock.price.toFixed(2)}
												</td>
												<td className="p-3 text-left">
													${stock.high.toFixed(2)}
												</td>
												<td className="p-3 text-left">
													${stock.low.toFixed(2)}
												</td>
												<td
													className={`p-3 text-left ${
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
															{stock.change.toFixed(2)} ({stock.changePercent}%)
															{stock.change >= 0 ? (
																<FiTrendingUp size={10} />
															) : (
																<FiTrendingDown size={10} />
															)}
														</Flex>
													</Badge>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<Center
									className="w-full"
									py={40}>
									<Skeleton
										animate
										h={400}
									/>
								</Center>
							)}
						</Stack>
					</Stack>
				</Stack>
			</div>
		</div>
	);
}
