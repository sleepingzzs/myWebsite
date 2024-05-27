const keys = {
	secret: process.env.NEXT_PUBLIC_SECRET,
	id: process.env.NEXT_PUBLIC_ID,
};

async function getCurrentTrack() {
	const accessToken = keys.secret; // Replace with your access token

	// Make a GET request to Spotify API endpoint
	const response = await fetch(
		"https://api.spotify.com/v1/me/player/currently-playing",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	// If the response is successful, parse the JSON response
	if (response.ok) {
		const data = await response.json();
		return data.item; // Return the currently playing track object
	} else {
		// If there's an error, throw an error with the status text
		throw new Error(
			"Failed to fetch currently playing track: " + response.statusText
		);
	}
}

// Example usage
export const track = getCurrentTrack()
	.then((currentTrack) => {
		console.log("Currently Playing Track:", currentTrack);
	})
	.catch((error) => {
		console.error(error);
	});
