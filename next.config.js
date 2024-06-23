/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};
