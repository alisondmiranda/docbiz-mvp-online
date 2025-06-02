// src/components/Auth.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Certifique-se que o caminho está correto

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      // O App.jsx vai detectar a mudança de sessão e atualizar a UI
      // alert('Login successful!'); // Você pode remover este alerta depois
    }
    setLoading(false);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      // Se a confirmação de email estiver desabilitada no Supabase, o usuário já estará logado.
      // Se estiver habilitada, ele receberá um email.
      alert('Signup process initiated. If email confirmation is on, check your email.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // Garante que ele redirecione de volta para a URL atual após o login do Google
      }
    });
    if (error) {
      alert(error.error_description || error.message);
      setLoading(false);
    }
    // O redirecionamento para o Google e de volta é tratado pelo Supabase
    // setLoading(false) pode não ser alcançado se o redirecionamento ocorrer
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>DocBiz MVP</h1>
      <p>Sign in or create an account</p>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <button type="button" onClick={handleSignup} disabled={loading} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <hr style={{ margin: '20px 0' }} />
      <button onClick={handleGoogleLogin} disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
        {loading ? 'Loading...' : 'Login with Google'}
      </button>
    </div>
  );
}