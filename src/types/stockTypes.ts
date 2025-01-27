export interface Stock {
	symbol: string;
	price: number;
	change: number;
	changePercent: string;
	volume: number;
	high: number;
	low: number;
	open: number;
	name: string;
	logo: string;
	industry: string;
	marketCap: number;
	website: string;
}

export interface IStockResult {
	description: string;
	displaySymbol: string;
	symbol: string;
	type: string;
}
