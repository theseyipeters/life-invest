/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import OverlayModal from "@/components/common/OverlayModal/OverlayModal";
import {
	ActionIcon,
	Badge,
	Box,
	CloseIcon,
	Group,
	Image,
	Skeleton,
	Stack,
	Text,
} from "@mantine/core";
import { getSingleStockData } from "@/lib/finnhub";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface StockModalProps {
	opened: boolean;
	close: () => void;
	symbol?: string;
}

export default function StockModal({ opened, close, symbol }: StockModalProps) {
	const [stockData, setStockData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (symbol) {
			(async () => {
				try {
					setLoading(true);
					setError(null);
					const data = await getSingleStockData(symbol);
					console.log(data);
					setStockData(data);
				} catch (err: any) {
					console.log(err);
					setError(
						err.response?.data?.error || "An unexpected error occurred."
					);
					setStockData(null);
				} finally {
					setLoading(false);
				}
			})();
		}
	}, [symbol]);

	const arrowIcon =
		stockData?.change >= 0 ? (
			<FiTrendingUp size={10} />
		) : (
			<FiTrendingDown size={10} />
		);
	const badgeColor = stockData?.change >= 0 ? "#E9FFE3" : "#FFDFDF";

	return (
		<OverlayModal
			opened={opened}
			onClose={close}
			radius={0}
			fullScreen
			withCloseButton={false}>
			<div className="w-full md:w-[70%] lg:w-[40%] shadow-md  mx-auto flex h-screen p-5">
				<Stack w={"100%"}>
					<Group
						align="center"
						justify="flex-end">
						<ActionIcon
							onClick={close}
							bg={"black"}>
							<CloseIcon />
						</ActionIcon>
					</Group>

					{error ? (
						<Box
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
								textAlign: "center",
							}}>
							<Stack>
								<Text
									fz={30}
									fw={600}>
									Access Denied!
								</Text>
								<Text size="lg">
									Your API key does not have the necessary permissions to
									perform this request. Please ensure your key includes access
									to all portfolios.
								</Text>
							</Stack>
						</Box>
					) : (
						<>
							<div className="w-full rounded-full">
								{loading ? (
									<Skeleton
										animate
										h={300}
									/>
								) : stockData?.logo ? (
									<Image
										w={"100%"}
										h={"100%"}
										alt=""
										fallbackSrc="https://placehold.co/600x600?text=No image available"
										src={stockData.logo}
									/>
								) : (
									<Image
										w={"100%"}
										h={"100%"}
										alt=""
										src="https://placehold.co/600x600?text=No image available"
									/>
								)}
							</div>

							{!loading && stockData && (
								<>
									<Group
										align="flex-start"
										justify="space-between">
										<Box>
											<Text
												fw={600}
												fz={30}>
												{stockData.name || "N/A"}
											</Text>
											<Text color="dimmed">{stockData.symbol}</Text>
										</Box>
										<Text fz={{ base: 25, md: 30 }}>${stockData.price}</Text>
									</Group>

									<Group mt={10}>
										<Text
											color="#2AB500"
											fz={14}>
											High: ${stockData.high}
										</Text>
										<Text
											color="#FF4646"
											fz={14}>
											Low: ${stockData.low}
										</Text>
										<Text fz={14}>Open: ${stockData.open}</Text>
									</Group>

									<Group mt={5}>
										<Text
											color="dimmed"
											fz={14}>
											Market Cap: ${stockData.marketCap}
										</Text>
										<Text
											color="dimmed"
											fz={14}>
											Industry: {stockData.industry || "N/A"}
										</Text>
									</Group>

									<Group mt={5}>
										<Badge
											color={badgeColor}
											variant="filled">
											<Group
												gap={5}
												fw={400}
												c={stockData?.change >= 0 ? "#2AB500" : "#FF4646"}>
												{arrowIcon} {stockData?.change >= 0 ? "+" : ""}
												{stockData?.change?.toFixed(2)} (
												{stockData?.changePercent}
												%)
											</Group>
										</Badge>
									</Group>
								</>
							)}
						</>
					)}
				</Stack>
			</div>
		</OverlayModal>
	);
}
