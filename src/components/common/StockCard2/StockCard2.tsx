import React from "react";
import { Card, Text, Image, Group, Badge, Stack } from "@mantine/core";
import { Stock } from "@/types/stockTypes";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface StockCardProps {
	stock: Stock;
}

const StockCard2: React.FC<StockCardProps> = ({ stock }) => {
	const arrowIcon =
		stock.change >= 0 ? (
			<FiTrendingUp size={10} />
		) : (
			<FiTrendingDown size={10} />
		);
	const badgeColor = stock.change >= 0 ? "#E9FFE3" : "#FFDFDF";

	return (
		<Card
			radius={20}
			py={20}
			withBorder>
			<Group
				align={"center"}
				justify={"space-between"}>
				<div className="w-[30px] h-[30px] md:h-[50px] md:w-[50px] rounded-full">
					<Image
						radius={150}
						src={stock.logo}
						alt={`${stock.symbol} logo`}
					/>
				</div>

				<Text fz={{ base: 25, md: 30 }}>${stock.price.toFixed(2)}</Text>
			</Group>

			<Group
				mt={10}
				align="flex-start"
				justify="space-between">
				<Stack gap={0}>
					<Text fz={20}>{stock.symbol}</Text>
				</Stack>

				<Group mt={5}>
					<Badge
						color={badgeColor}
						variant="filled">
						<Group
							gap={5}
							fw={500}
							c={stock.change >= 0 ? "#2AB500" : "#FF4646"}>
							{arrowIcon} {stock.change >= 0 ? "+" : ""}
							{stock.changePercent}%
						</Group>
					</Badge>
				</Group>
			</Group>
		</Card>
	);
};

export default StockCard2;
