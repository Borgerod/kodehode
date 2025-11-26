import { createContext, useContext, ReactNode, useState } from "react";

type ThemeContextType = {
	data: string;
};

const ThemeContext = createContext<ThemeContextType>({ data: "" });

type ThemeProviderProps = {
	children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState("light");
	const styles = {
		light: {
			color: "black",
			backgroundColor: "white",
			border: "solid black",
		},
		dark: {
			color: "white",
			backgroundColor: "black",
			border: "solid white",
		},
	};
	return (
		<ThemeContext.Provider value={{ data }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
