



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
                getUsers(res.token);

            } else if (res.message === 'Password incorrect') {
                alert('Не вірна комбінація логіна чи пароля');
            } else if (res.message === 'User is not exists') {
                alert(" Такий користувач не зареестрований")
            }
        })
}

function getUsers(token) {
    const route = 'http://localhost:3000/users';
    fetch(route, {
        method: 'POST',
        headers: { authentication: `Bearer ${token}` }
    });
    //window.location.href = 'http://localhost:3000/users/all'
   
}

function register() {
    const route = 'http://localhost:3000/auth/registration';
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
                alert(`${res.token}`);
            } else if (res.error === 'Bad Request') {
                alert('Такий користувач вже існує');
            } else {
                alert("Неправильний логін чи пароль. Спробуйте ще раз")
            }
        })
}

