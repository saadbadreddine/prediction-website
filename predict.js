window.onload = () => {
	fetch('https://dog.ceo/api/breeds/image/random')
		.then((response) => response.json())
		.then((data) => (document.getElementById('doggo').src = data.message));

	let name = 'Najib';
	name.toLowerCase;

	let nation_url = 'https://api.nationalize.io/?name=' + name;
	let age_url = 'https://api.agify.io/?name=' + name;
	let gender_url = 'https://api.genderize.io?name=' + name;

	let age;
	let gender;
	let country;

	fetch(nation_url)
		.then((response) => response.json())
		.then((data) => {
			country = data.country;
		})
		.then(() => console.log(country));

	fetch(age_url).then((response) => response.json()).then((data) => (age = data.age)).then(() => console.log(age));

	fetch(gender_url)
		.then((response) => response.json())
		.then((data) => (gender = data.gender))
		.then(() => console.log(gender));
};
