import "./globals.css";
import { Poppins } from "next/font/google";
import Nav from "@/components/Navbar";
const font = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
	title: "Abismar",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<Nav />
				<main className='max-w-5xl mx-auto tab:mx-2'>{children}</main>
			</body>
		</html>
	);
}
