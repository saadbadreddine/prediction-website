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

	//-------------------------------------Promise.all-----------------------------------------//
	const predictPerson = (name) => {
		name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		document.getElementById('name').textContent = ` ${name}`;
		let person = new Person();
		person.name = name;
		name.toLowerCase;
		Promise.all([
			fetch(`https://api.agify.io/?name=${name}`),
			fetch(`https://api.genderize.io?name=${name}`),
			fetch(`https://api.nationalize.io/?name=${name}`)
		])
			.then((responses) => {
				// Get a JSON object from each of the responses
				return Promise.all(
					responses.map(function(response) {
						return response.json();
					})
				);
			})
			.then((data) => {
				person.age = data[0].age;
				person.gender = data[1].gender;
				person.gender = person.gender.charAt(0).toUpperCase() + person.gender.slice(1);
				person.country = [];
				document.getElementById('gender').textContent = ` ${person.gender}`;
				document.getElementById('age').textContent = ` ${person.age}`;
				data[2].country.forEach((element) => person.country.push(element.country_id));
				document.getElementById('nationality').textContent = ` ${person.country}`;
				document.getElementsByClassName('predict-box')[0].style.display = 'flex';
			})
			.catch((error) => {
				// if there's an error, log it
				console.log(error);
			});
	};

	//-------------------------------------Chaining promises-----------------------------------------//

	/* 
	let predictPerson = (name) => {
		name.toLowerCase;
		document.getElementById('name').textContent = name.charAt(0).toUpperCase() + name.slice(1);
		let nation_url = 'https://api.nationalize.io/?name=' + name;
		let age_url = 'https://api.agify.io/?name=' + name;
		let gender_url = 'https://api.genderize.io?name=' + name;
		let country_url = 'https://restcountries.com/v3.1/alpha?codes=';

		let homosapien = new Person();
		homosapien.name = name.charAt(0).toUpperCase() + name.slice(1);
		let country_code = '';
		let country_name = '';

		fetch(age_url).then((response) => response.json()).then((data) => {
			homosapien.age = data.age;
			document.getElementById('age').textContent = data.age;
		});

		fetch(gender_url).then((response) => response.json()).then((data) => {
			homosapien.gender = data.gender;
			homosapien.gender = homosapien.gender.charAt(0).toUpperCase() + homosapien.gender.slice(1);
			homosapien.gender_probability = data.probability;
			document.getElementById('gender').textContent = ` ${homosapien.gender}`;
			country_code = country_code.replace(/,\s*$/, '');
		});

		fetch(nation_url)
			.then((response) => response.json())
			.then((data) => {
				homosapien.country = data.country;
			})
			.then(() => {
				homosapien.country.forEach((element, idx) => (country_code += `${element.country_id},`));
			})
			.then(() => fetch(`${country_url}${country_code}`))
			.then((response) => response.json())
			.then((data) => {
				data.forEach((element) => (country_name += `${element.name.common}, `));
				country_name = country_name.replace(/,\s*$/, '');
				document.getElementById('nationality').textContent = ` ${country_name}`;
			});

		setTimeout(() => {
			document.getElementsByClassName('predict-box')[0].style.display = 'flex';
			console.log(homosapien);
			console.log(country_name);
		}, 0);
	};*/
};
