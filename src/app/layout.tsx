import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";

export const metadata = {
	title: "LifeInvest by Eazipay",
	description: "An application for life investments.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="antialiased">
				<MantineProvider>{children}</MantineProvider>
			</body>
		</html>
	);
}
