window.onload = () => {
	fetch('https://dog.ceo/api/breeds/image/random')
		.then((response) => response.json())
		.then((data) => (document.getElementById('doggo').src = data.message));
	let name = 'Najib';
	name.toLowerCase;
	let nation_url = 'https://api.nationalize.io/?name=' + name;
	let age_url = 'https://api.agify.io/?name=' + name;
	let gender_url = 'https://api.genderize.io?name=' + name;
	let country_url = 'https://restcountries.com/v3.1/alpha?codes=';

	class Person {
		constructor(name, age, gender, country) {
			this.name = name;
			this.age = age;
			this.gender = gender;
			this.country = country;
		}
	}

	let homosapien = new Person();
	homosapien.name = name;
	let country_code = '';
	let country_name = [];

	fetch(age_url).then((response) => response.json()).then((data) => (homosapien.age = data.age));

	fetch(gender_url).then((response) => response.json()).then((data) => (homosapien.gender = data.gender));

	fetch(nation_url)
		.then((response) => response.json())
		.then((data) => {
			homosapien.country = data.country;
		})
		.then(() =>
			homosapien.country.forEach((element, idx) => {
				country_code += `${element.country_id},`;
				if (idx === homosapien.country.length - 1) {
					country_code += `${element.country_id}`;
					console.log(country_code);
				}
			})
		)
		.then(() => fetch(`${country_url}${country_code}`))
		.then((response) => response.json())
		.then((data) => {
			data.forEach((element) => {
				country_name.push(element.name.official);
			});
		});

	console.log(country_name);
};
