const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpButtonResponsive = document.getElementById('signUpResponsive');
const signInButtonResponsive = document.getElementById('signInResponsive')
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signUpButtonResponsive.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signInButtonResponsive.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});