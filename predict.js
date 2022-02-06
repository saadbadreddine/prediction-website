window.onload = () => {
	class Person {
		constructor(name, age, gender, gender_probability, country, country_probability) {
			this.name = name;
			this.age = age;
			this.gender = gender;
			this.gender_probability = gender_probability;
			this.country = country;
			this.country_probability = country_probability;
		}
	}

	fetch('https://dog.ceo/api/breeds/image/random')
		.then((response) => response.json())
		.then((data) => (document.getElementById('doggo').src = data.message));
	let name = '';
	document.getElementById('name-form').addEventListener('submit', (e) => {
		name = document.getElementById('name-input').value;
		e.preventDefault();
		predictPerson(name);
	});

	let predictPerson = (name) => {
		document.getElementById('name').textContent = name;
		name.toLowerCase;
		let nation_url = 'https://api.nationalize.io/?name=' + name;
		let age_url = 'https://api.agify.io/?name=' + name;
		let gender_url = 'https://api.genderize.io?name=' + name;
		let country_url = 'https://restcountries.com/v3.1/alpha?codes=';

		let homosapien = new Person();
		homosapien.name = name;
		let country_code = '';
		let country_name = [];

		fetch(age_url).then((response) => response.json()).then((data) => {
			homosapien.age = data.age;
			document.getElementById('age').textContent = data.age;
		});

		fetch(gender_url).then((response) => response.json()).then((data) => {
			homosapien.gender = data.gender;
			homosapien.gender_probability = data.probability;
			document.getElementById('gender').textContent = data.gender;
		});

		fetch(nation_url)
			.then((response) => response.json())
			.then((data) => {
				homosapien.country = data.country;
			})
			.then(() =>
				homosapien.country.forEach((element, idx) => {
					if (idx === homosapien.country.length - 1) {
						country_code += `${element.country_id}`;
					} else {
						country_code += `${element.country_id},`;
					}
				})
			)
			.then(() => fetch(`${country_url}${country_code}`))
			.then((response) => response.json())
			.then((data) => {
				data.forEach((element) => {
					country_name.push(element.name.common);
				});
				document.getElementById('nationality').textContent = country_name;
			});

		setTimeout(() => {
			console.log(homosapien);
			console.log(country_name);
		}, 0);
	};
};
