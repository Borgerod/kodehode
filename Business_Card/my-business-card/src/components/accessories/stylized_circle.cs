import React from "react";

// Minimal component that exports a div. The only styling is provided via the
// `styles` variable which contains the Tailwind class `bg-yellow-100`.
export const StylizedCircle = () => {
	const styles = "bg-yellow-100";
return < div className ={ styles} />;
};

export default StylizedCircle;

