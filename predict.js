window.onload = () => {
	fetch('https://dog.ceo/api/breeds/image/random')
		.then((response) => response.json())
		.then((data) => (document.getElementById('doggo').src = data.message));
};
