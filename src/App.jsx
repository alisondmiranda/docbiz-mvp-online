// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Certifique-se que o caminho está correto
import Auth from './components/Auth';
// Vamos criar um Dashboard simples depois
// import Dashboard from './components/Dashboard'; // Descomente quando tiver o Dashboard

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  if (!session) {
    return <Auth />;
  } else {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Welcome to DocBiz, {session.user.email}!</h2>
        <p>Your User ID: {session.user.id}</p>
        {/* Aqui virá o Dashboard com extração e contratos */}
        {/* Exemplo: <Dashboard session={session} /> */}
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ marginTop: '20px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Sign Out
        </button>
      </div>
    );
  }
}

export default App;