import axios from "axios";

// const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const API_KEY = "cuadoepr01qof06i9vf0cuadoepr01qof06i9vfg";
const API_KEY2 = process.env.NEXT_PUBLIC_ALPHA_API_KEY;

const finnhubClient = axios.create({
	baseURL: "https://finnhub.io/api/v1",
});
const alphaClient = axios.create({
	baseURL: "https://www.alphavantage.co",
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

export const getCompanyProfile = async (symbol: string) => {
	try {
		const response = await finnhubClient.get("/stock/profile2", {
			params: {
				symbol,
				token: API_KEY,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching company profile:", error);
	}
};

export const searchStocks2 = async (query: string) => {
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
	}
};
export const searchStocks = async (query: string) => {
	try {
		const response = await alphaClient.get(
			`/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY2}`
		);
		return response.data;
	} catch (error) {
		console.error("Error searching for stocks:", error);
	}
};

export const getStockData = async () => {
	const topStockSymbols = ["AAPL", "MSFT", "TSLA", "GOOGL", "ABNB", "AMZN"];

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

export const getSingleStockData = async (symbol: string) => {
	try {
		const [quoteResponse, profileResponse] = await Promise.all([
			finnhubClient.get("/quote", {
				params: {
					symbol,
					token: API_KEY,
				},
			}),
			finnhubClient.get("/stock/profile2", {
				params: {
					symbol,
					token: API_KEY,
				},
			}),
		]);

		const stockData = {
			symbol,
			price: quoteResponse.data.c,
			change: quoteResponse.data.d,
			changePercent: (
				(quoteResponse.data.d / quoteResponse.data.pc) *
				100
			).toFixed(2),
			volume: quoteResponse.data.v,
			high: quoteResponse.data.h,
			low: quoteResponse.data.l,
			open: quoteResponse.data.o,
			name: profileResponse.data.name,
			logo: profileResponse.data.logo,
			industry: profileResponse.data.finnhubIndustry,
			marketCap: profileResponse.data.marketCapitalization,
			website: profileResponse.data.weburl,
		};

		return stockData;
	} catch (error) {
		console.log(error);
		console.error(`Error fetching stock data for ${symbol}:`, error);
		throw error;
	}
};
