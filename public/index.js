
function login() {
    const route = 'http://localhost:3000/auth/login';
    const username = document.getElementById("login-input").value.trim();
    const password = document.getElementById("pass-input").value.trim();
    fetch(route, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token)
                getUser(res.token, 'user');
            } else if (res.message === 'Password incorrect') {
                alert('Не вірна комбінація логіна чи пароля');
            } else if (res.message === 'User is not exists') {
                alert(" Такий користувач не зареестрований")
            }
        })
}

function getUser(token, way) {
    const route = `http://localhost:3000/users/${way}`;
    fetch(route, {
        method: 'POST',
        headers: { authentication: `Bearer ${token}` }
    }).then(res => res.json())
        .then(res => {
            if (res.username && res.role) {
                window.location.href = route + `/?name=${res.username}&role=${res.role.name}`
            } else {
                alert("нема доступу")
            }
        })
}

function goToAdmLink() {
    const token = localStorage.getItem('token')
    getUser(token, 'admin')
}

function register() {
    const route = 'http://localhost:3000/auth/registration';
    const username = document.getElementById("login-input").value.trim();
    const password = document.getElementById("pass-input").value.trim();
    const role = document.getElementById("role-input").value.trim();
    if (!role) {
        alert('Виберіть роль користувача')
    }
    if (username && password && role) {

        fetch(route, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    alert(`Регестрація успішна`);
                } else if (res.error === 'Bad Request') {
                    alert('Такий користувач вже існує');
                } else {
                    alert("Неправильний логін чи пароль. Спробуйте ще раз")
                }
            })
    }
}