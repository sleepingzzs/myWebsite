async function getTrack() {
	const res = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sleepingzzs&api_key=${process.env.NEXT_PUBLIC_LASTFM}&format=json`
	);
	if (res.ok) {
		let data = await res.json().then((r) => r);
		try {
			return {
				name: data.recenttracks.track[0].name,
				artist: data.recenttracks.track[0].artist["#text"],
				url: data.recenttracks.track[0].url,
				isPlaying:
					data.recenttracks.track[0]["@attr"].nowplaying === "true"
						? true
						: false,
			};
		} catch {
			return {
				name: data.recenttracks.track[0].name,
				artist: data.recenttracks.track[0].artist["#text"],
				url: data.recenttracks.track[0].url,
				isPlaying: false,
			};
		}
	} else return { error: res.status };
}

export const track = getTrack();
