const base_url = window.location.origin + window.location.pathname;

window.onload = () => {
    const qrBtnEl = document.querySelector('.btn-qr');
    const qrCodeEl = document.querySelector('#qrcode');

    qrBtnEl.addEventListener('click', (e) => {
        makeDisabled(qrBtnEl, true); // Disable the button while processing

        fetch(base_url + 'api/sign-in')
            .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
            .then(([id, data]) => {
                console.log('Auth request data:', data);
                makeQr(qrCodeEl, data);
                handleDisplay(qrCodeEl, true);
                handleDisplay(qrBtnEl, false);
                return id;
            })
            .catch(err => {
                console.error('Error fetching sign-in data:', err);
                makeDisabled(qrBtnEl, false); // Re-enable the button on error
            });
    });

    // Check if the current URL has a session ID and handle redirection if so
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId');
    if (sessionId) {
        handleCallback(sessionId);
    }
}

function makeQr(el, data) {
    return new QRCode(el, {
        text: JSON.stringify(data),
        width: 450,
        height: 450,
        colorDark: "#000",
        colorLight: "#e9e9e9",
        correctLevel: QRCode.CorrectLevel.L
    });
}

function handleDisplay(el, needShow, display = 'block') {
    el.style.display = needShow ? display : 'none';
}

function makeDisabled(el, disabled, cls = 'disabled') {
    el.disabled = disabled;
    el.classList.toggle(cls, disabled);
}

function handleCallback(sessionId) {
    fetch(base_url + 'api/callback?sessionId=' + encodeURIComponent(sessionId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Callback response:', data);
        if (data.success && data.redirectUrl) {
            console.log('Redirecting to:', data.redirectUrl);
            window.location.href = data.redirectUrl; // Redirect to the URL provided by the server
        } else {
            console.error('Verification failed or no redirect URL provided');
        }
    })
    .catch(err => {
        console.error('Error during callback:', err);
    });
}
