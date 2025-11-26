import { createContext, useContext, ReactNode } from "react";

type AppContextType = {
	data: string;
};

const AppContext = createContext<AppContextType>({ data: "" });

type AppProviderProps = {
	children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const data: string = "Lars";
	return (
		<AppContext.Provider value={{ data }}>{children}</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
