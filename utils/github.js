async function getRepos() {
	const res = await fetch("https://api.github.com/users/sleepingzzs/repos");

	if (res.ok) {
		let data = await res.json().then((r) => r);

		const l = data.length;
		console.log(l);
		const ndata = [];
		for (let i = 0; i < l; i++) {
			if (data[i].name === "sleepingzzs") continue;
			ndata.push({
				name: data[i].full_name,
				url: data[i].html_url,
				description: data[i].description,
				stars: data[i].stargazers_count,
				language: data[i].language,
				push: data[i].pushed_at,
			});
		}
		return ndata;
	} else {
		throw new Error("Failed to fetch repos:" + res.statusText);
	}
}

export const repos = getRepos();
