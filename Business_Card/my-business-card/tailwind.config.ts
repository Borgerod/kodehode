import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--color-background)",
				foreground: "var(--color-foreground)",
			},
			fontFamily: {
				sans: ["var(--font-sans)"],
				mono: ["var(--font-mono)"],
			},
		},
	},
	plugins: [],
} satisfies Config;
