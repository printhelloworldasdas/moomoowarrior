// ==UserScript==
// @name         MooMoo Warrior
// @version      0.1
// @description  Play MooMoo Warrior: A thrilling 2D survival game. Join fast-paced multiplayer battles and dominate the server!
// @author       Kooky Warrior
// @match        *://*.moomoo.io/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

;(async () => {
	unsafeWindow.stop()

	const LINK = "https://kookywarrior.github.io/moomoowarrior-sources"
	let customHTML = ""

	try {
		const response = await fetch(`${LINK}/game.html`)
		customHTML = await response.text()
		customHTML = customHTML.replaceAll(`href="./`, `href="${LINK}/`)
		customHTML = customHTML.replace(`src/js/loader.js`, `${LINK}/src/js/build.js`)
	} catch (error) {
		console.error(error)
		return
	}

	try {
		const response = await fetch(`${LINK}/config.json`)
		unsafeWindow.config = await response.json()
	} catch (error) {
		console.error(error)
		return
	}

	try {
		const response = await fetch(`${LINK}/info.json`)
		unsafeWindow.info = await response.json()
	} catch (error) {
		console.error(error)
		return
	}

	document.documentElement.innerHTML = customHTML

	const styles = document.querySelectorAll("link[rel=stylesheet]")
	Array.from(styles).forEach(async (style) => {
		style.remove()

		const newStyle = document.createElement("style")
		try {
			const response = await fetch(style.href)
			newStyle.innerHTML = await response.text()
			newStyle.innerHTML = newStyle.innerHTML.replaceAll(`url(../..`, `url(${LINK}`)
		} catch (error) {
			console.error(error)
			return
		}
		document.body.appendChild(newStyle)
	})

	const scripts = document.getElementsByTagName("script")
	Array.from(scripts).forEach(async (script) => {
		if (script.src == "") return
		script.remove()

		const newScript = document.createElement("script")
		try {
			const response = await fetch(script.src)
			newScript.innerHTML = await response.text()
		} catch (error) {
			console.error(error)
			return
		}
		document.body.appendChild(newScript)
	})
})()
