const el = {
    input: document.getElementById('username'),
    icon: document.getElementById('statusIcon'),
    feedback: document.getElementById('feedback'),
    btn: document.getElementById('submitBtn')
};

const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
};

const setStatus = (state, msg = '') => {
    el.feedback.textContent = msg;
    if (state === 'loading') {
        el.icon.innerHTML = '<div class="spinner" style="display:block; width:16px; height:16px; border-width:2px;"></div>';
        el.input.style.borderColor = 'var(--primary)';
    } else if (state === 'success') {
        el.icon.innerHTML = '✅';
        el.input.style.borderColor = 'var(--success)';
        el.feedback.style.color = 'var(--success)';
        el.btn.disabled = false;
    } else if (state === 'error') {
        el.icon.innerHTML = '❌';
        el.input.style.borderColor = 'var(--error)';
        el.feedback.style.color = 'var(--error)';
        el.btn.disabled = true;
    } else {
        el.icon.innerHTML = '';
        el.input.style.borderColor = 'var(--border)';
        el.btn.disabled = true;
    }
};

const checkUsername = async (username) => {
    if (!username) {
        setStatus('idle');
        return;
    }
    
    setStatus('loading');
    
    try {
        await new Promise(r => setTimeout(r, 600)); 
        const res = await fetch('users.json');
        const users = await res.json();
        
        if (users.includes(username.toLowerCase())) {
            setStatus('error', 'Username is already taken');
        } else {
            setStatus('success', 'Username available');
        }
    } catch (e) {
        setStatus('error', 'Server error. Try again.');
    }
};

el.input.addEventListener('input', debounce((e) => checkUsername(e.target.value.trim()), 500));