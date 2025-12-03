import React from 'react';
import { User } from 'lucide-react';
import { CampfireIllustration } from '../shared/CampfireIllustration';

interface LoginViewProps {
    onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    return (
        <div className="flex h-screen w-full bg-white font-sans overflow-hidden">
            <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-between relative z-10">
                <div className="text-black font-bold text-xl tracking-widest">TOTODORO</div>
                <div className="max-w-sm w-full mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome</h1>
                        <p className="text-gray-500">Sign in to continue your productivity journey.</p>
                    </div>
                    <div className="space-y-5">
                        <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Continue with Google
                        </button>
                        <div className="flex items-center gap-4"><div className="h-px bg-gray-200 flex-1"></div><span className="text-xs text-gray-400 font-medium uppercase">or</span><div className="h-px bg-gray-200 flex-1"></div></div>
                        <button onClick={onLogin} className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            <User size={18} /> Continue as Guest
                        </button>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500">By continuing, you agree to our Terms & Privacy Policy.</div>
            </div>
            <div className="hidden lg:flex lg:w-1/2 bg-[#FFF7ED] relative flex-col items-center justify-center p-12 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full"><div className="absolute top-20 right-20 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div><div className="absolute bottom-20 left-20 w-96 h-96 bg-red-300/20 rounded-full blur-3xl"></div></div>
                <div className="relative z-10 transform scale-125 mb-12"><CampfireIllustration /></div>
                <div className="relative z-10 max-w-md"><h2 className="text-3xl font-bold text-gray-900 mb-4">Keep the fire burning</h2><p className="text-gray-500 leading-relaxed">Join Totodoro to track your focus, maintain your streaks, and achieve your goals with the power of minimalism.</p></div>
            </div>
        </div>
    );
};
