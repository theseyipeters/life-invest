import { Card, Text, Image, Group, Badge, Stack } from "@mantine/core";
import { Stock } from "@/types/stockTypes";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface StockCardProps {
	stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
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
			<Group className="w-[50px] h-[50px] border rounded-full">
				<Image
					radius={150}
					src={stock.logo}
					alt={`${stock.symbol} logo`}
					width={20}
					height={20}
				/>
			</Group>
			<Group
				mt={10}
				align="flex-start"
				justify="space-between">
				<Stack gap={0}>
					<Text fz={20}>{stock.symbol}</Text>
					<Text
						fz={16}
						color="dimmed">
						{stock.name}
					</Text>
				</Stack>

				<Group mt={5}>
					<Badge
						color={badgeColor}
						variant="filled">
						<Group
							gap={5}
							fw={400}
							c={stock.change >= 0 ? "#2AB500" : "#FF4646"}>
							{arrowIcon} {stock.change >= 0 ? "+" : ""}
							{stock.change.toFixed(2)} ({stock.changePercent}%)
						</Group>
					</Badge>
				</Group>
			</Group>
			<Text
				fz={30}
				mt={10}>
				${stock.price.toFixed(2)}
			</Text>

			<Group mt={10}>
				<Text
					color="#2AB500"
					fz={14}>
					High: ${stock.high.toFixed(2)}
				</Text>
				<Text
					color="#FF4646"
					fz={14}>
					Low: ${stock.low.toFixed(2)}
				</Text>
				<Text fz={14}>Open: ${stock.open.toFixed(2)}</Text>
			</Group>
			<Group mt={5}>
				<Text
					color="dimmed"
					fz={14}>
					Market Cap: ${stock.marketCap.toLocaleString()}
				</Text>
				<Text
					color="dimmed"
					fz={14}>
					Industry: {stock.industry}
				</Text>
			</Group>
		</Card>
	);
};

export default StockCard;
