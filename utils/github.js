async function getRepos() {
	const res = await fetch("https://api.github.com/users/sleepingzzs/repos");

	if (res.ok) {
		let data = await res.json().then((r) => r);

		const l = data.length;
		let ndata = [];
		for (let i = 0; i < l; i++) {
			if (data[i].name === "sleepingzzs") continue;
			ndata.push({
				name: data[i].full_name,
				url: data[i].html_url,
				description: data[i].description,
				stars: data[i].stargazers_count,
				language: data[i].language,
				push: new Date(
					data[i].pushed_at.slice(0, data[i].pushed_at.indexOf("T"))
				).getTime(),
			});
		}
		for (let i = 0; i < ndata.length - 1; i++) {
			for (let j = i + 1; j < ndata.length; j++) {
				if (ndata[i].push < ndata[j].push) {
					let temp = ndata[j];
					ndata[j] = ndata[i];
					ndata[i] = temp;
				}
			}
		}
		return ndata;
	} else {
		throw new Error("Failed to fetch repos:" + res.statusText);
	}
}

export const repos = getRepos();
