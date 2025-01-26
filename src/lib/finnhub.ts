import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

const finnhubClient = axios.create({
	baseURL: "https://finnhub.io/api/v1",
});

export const getStockPrice = async (symbol: string) => {
	try {
		const response = await finnhubClient.get("/quote", {
			params: {
				symbol,
				token: API_KEY,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching stock price:", error);
		throw error;
	}
};

export const searchStocks = async (query: string) => {
	try {
		const response = await finnhubClient.get("/search", {
			params: {
				q: query,
				token: API_KEY,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error searching for stocks:", error);
		throw error;
	}
};

export const getStockData = async () => {
	const topStockSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];

	try {
		const [quoteResponses, profileResponses] = await Promise.all([
			Promise.all(
				topStockSymbols.map((symbol) =>
					finnhubClient.get("/quote", {
						params: {
							symbol,
							token: API_KEY,
						},
					})
				)
			),
			Promise.all(
				topStockSymbols.map((symbol) =>
					finnhubClient.get("/stock/profile2", {
						params: {
							symbol,
							token: API_KEY,
						},
					})
				)
			),
		]);

		const combinedData = topStockSymbols.map((symbol, index) => ({
			symbol,
			price: quoteResponses[index].data.c,
			change: quoteResponses[index].data.d,
			changePercent: (
				(quoteResponses[index].data.d / quoteResponses[index].data.pc) *
				100
			).toFixed(2),
			volume: quoteResponses[index].data.v,
			high: quoteResponses[index].data.h,
			low: quoteResponses[index].data.l,
			open: quoteResponses[index].data.o,
			name: profileResponses[index].data.name,
			logo: profileResponses[index].data.logo,
			industry: profileResponses[index].data.finnhubIndustry,
			marketCap: profileResponses[index].data.marketCapitalization,
			website: profileResponses[index].data.weburl,
		}));

		return combinedData;
	} catch (error) {
		console.error("Error fetching combined stock data:", error);
		throw error;
	}
};
