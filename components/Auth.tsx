import React, { useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { app } from '../services/firebase';
import Loader from './Loader';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';
import EmailIcon from './icons/EmailIcon';
import GoogleIcon from './icons/GoogleIcon';
import Home from './Home';
import FastForwardIcon from './icons/FastForwardIcon';


const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [devBypass, setDevBypass] = useState(false);

  const auth = getAuth(app);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isLogin && password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: username });
        }
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('E-mail ou senha inválidos.');
      } else {
        setError('Ocorreu um erro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError('Falha ao entrar com o Google. Tente novamente.');
    } finally {
      setGoogleLoading(false);
    }
  };

  if (devBypass) {
    return <Home />;
  }

  const InputField: React.FC<{icon: React.ReactNode, type: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({icon, type, placeholder, value, onChange}) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full pl-12 pr-4 py-3 bg-black/40 text-text-primary placeholder-text-secondary border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary-start/60 focus:border-brand-primary-start transition-all duration-300 ease-apple shadow-inner"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        
        <div className="bg-glass-bg backdrop-blur-3xl border border-glass-border rounded-3xl shadow-2xl p-8 space-y-6">
          <h1 className="text-center text-4xl font-black text-text-primary tracking-wider bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
            {isLogin ? 'LOGIN' : 'CADASTRO'}
          </h1>
          
          <form onSubmit={handleAuthAction} className="space-y-4">
            {isLogin ? (
              <InputField icon={<UserIcon />} type="email" placeholder="Nome de usuário/email..." value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <>
                <InputField icon={<EmailIcon />} type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField icon={<UserIcon />} type="text" placeholder="Nome de usuário..." value={username} onChange={(e) => setUsername(e.target.value)} />
              </>
            )}
            
            <InputField icon={<LockIcon />} type="password" placeholder="Senha..." value={password} onChange={(e) => setPassword(e.target.value)} />

            {!isLogin && (
              <InputField icon={<LockIcon />} type="password" placeholder="Confirmar senha..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            )}

            {error && <p className="text-yellow-400 text-xs text-center pt-2">{error}</p>}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3.5 px-4 font-bold text-white bg-gradient-to-br from-brand-primary-start to-brand-primary-end rounded-xl shadow-lg shadow-brand-primary-start/20 hover:shadow-brand-primary-start/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-apple flex items-center justify-center transform hover:scale-105"
              >
                {loading ? <Loader size="sm" /> : (isLogin ? 'Entrar' : 'Cadastrar')}
              </button>
            </div>
          </form>

          {isLogin && (
            <>
              <div className="flex items-center justify-center my-2">
                <span className="h-px bg-glass-border w-full"></span>
                <span className="px-2 text-xs text-text-secondary uppercase">Ou</span>
                <span className="h-px bg-glass-border w-full"></span>
              </div>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="w-full py-3 px-4 font-bold text-text-primary bg-glass-bg border border-glass-border rounded-xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-apple flex items-center justify-center gap-2 transform hover:scale-105"
              >
                {googleLoading ? <Loader size="sm" /> : <><GoogleIcon /> Entrar com Google</>}
              </button>
            </>
          )}

          <div className="text-center text-sm text-text-secondary">
            <span>{isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}</span>
            <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="font-bold text-brand-primary-start hover:text-sky-300 transition-colors ease-apple ml-2">
              {isLogin ? 'Cadastrar' : 'Entrar'}
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <button
                onClick={() => setDevBypass(true)}
                title="Acesso de Desenvolvedor: Pular Login"
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-text-secondary bg-glass-bg border border-glass-border rounded-xl shadow-lg hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent-end/50 transition-all duration-300 ease-apple"
            >
                <FastForwardIcon />
                Acesso Dev
            </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;