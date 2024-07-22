(async () => {
    try {
		const response = await fetch("config.json")
		window.config = await response.json()
	} catch (error) {
		console.error(error)
		return
	}

	try {
		const response = await fetch("info.json")
		window.info = await response.json()
	} catch (error) {
		console.error(error)
		return
    }

    window.info.LINKS.source = window.info.LINKS.main

	const script = document.createElement("script")
	script.src = `${window.info.LINKS.source}/src/js/buildMain.js`
	script.type = "module"
	document.body.appendChild(script)
})()
