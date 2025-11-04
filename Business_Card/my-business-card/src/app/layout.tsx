import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
// ...existing code...// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";

// const geistSans = Geist({
// 	variable: "--font-geist-sans",
// 	subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
// 	variable: "--font-geist-mono",
// 	subsets: ["latin"],
// });

// export const metadata: Metadata = {
// 	title: "Business Card - Aleksander Borgerød",
// 	description: "Digital business card for Aleksander Borgerød",
// };

// // export default function RootLayout({
// // 	children,
// // }: Readonly<{
// // 	children: React.ReactNode;
// // }>) {
// // 	return (
// // 		<html lang="en">
// // 			<body
// // 				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[url(url('/assets/images/background.jpg')')] bg-cover bg-center`}>
// // 				{children}
// // 			</body>
// // 		</html>
// // 	);
// // }

// export default function RootLayout({
// 	children,
// }: Readonly<{
// 	children: React.ReactNode;
// }>) {
// 	return (
// 		<html lang="en">
// 			<body
// 				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
// 				{children}
// 			</body>
// 		</html>
// 	);
// }
