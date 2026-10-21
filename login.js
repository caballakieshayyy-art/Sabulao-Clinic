// 1. Initialize Supabase Client
const SUPABASE_URL = 'https://ldrurafnwzxrkadvsnod.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jKquzC6UTLM54y_mOLJS8A_w6D3-...';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toRegisterBtn = document.getElementById('toRegisterBtn');
const toLoginBtn = document.getElementById('toLoginBtn');

// 3. Toggle View between Login and Register
if (toRegisterBtn) {
  toRegisterBtn.addEventListener('click', () => toggleView('register'));
}
if (toLoginBtn) {
  toLoginBtn.addEventListener('click', () => toggleView('login'));
}

function toggleView(view) {
  clearAlert();
  if (view === 'register') {
    if (loginForm) loginForm.classList.add('hidden');
    if (registerForm) registerForm.classList.remove('hidden');
  } else {
    if (registerForm) registerForm.classList.add('hidden');
    if (loginForm) loginForm.classList.remove('hidden');
  }
}

function clearAlert() {
  // Optional helper if you have custom alert UI elements
}

// 4. Handle Login via Supabase Auth
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Login Failed: ' + error.message);
    } else {
      alert('Login Successful!');
      window.location.href = 'admin.html';
    }
  });
}

// 5. Handle Registration via Supabase Auth
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert('Registration Failed: ' + error.message);
    } else {
      alert('Registration Successful! Please check your email for confirmation.');
    }
  });
}
