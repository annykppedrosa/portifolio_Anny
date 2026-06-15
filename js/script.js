// Atualiza ano do rodapé dinamicamente
const yearElement = document.getElementById('year');
if (yearElement) {
	yearElement.textContent = new Date().getFullYear();
}

// Menu mobile toggle
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
	toggle.addEventListener('click', () => {
		const expanded = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!expanded));
		navLinks.classList.toggle('open');
	});
}

// Validação do formulário de contato
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function setError(fieldId, message) {
	const el = document.getElementById(fieldId + '-error');
	if (el) el.textContent = message;
}

function clearErrors() {
	['name', 'email', 'message'].forEach((id) => setError(id, ''));
	if (status) status.textContent = '';
}

function isValidEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}


if (form) {
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		clearErrors();

		const name = form.name.value.trim();
		const email = form.email.value.trim();
		const message = form.message.value.trim();
		let valid = true;

		if (!name) {
			setError('name', 'Nome é obrigatório.');
			valid = false;
		}

		if (!email) {
			setError('email', 'E-mail é obrigatório.');
			valid = false;
		} else if (!isValidEmail(email)) {
			setError('email', 'E-mail inválido.');
			valid = false;
		}

		if (!message) {
			setError('message', 'Mensagem é obrigatória.');
			valid = false;
		}

		if (!valid) {
			return;
		}

		const submitBtn = document.getElementById('submitBtn');
		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.textContent = 'Enviando...';
		}

		setTimeout(() => {
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.textContent = 'Enviar';
			}
			form.reset();
			if (status) {
				status.textContent = 'Mensagem enviada com sucesso!';
			}
			alert('Mensagem enviada com sucesso!');
		}, 1000);
	});
}
