import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, LayoutTemplate, Activity, CheckCircle2, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => navigate('/dashboard'), 800); // Navigation destination might need changing later, but keeping as is for now
    };

    return (
        <div className="min-h-screen w-full flex bg-[#FDFEFF] font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">
            {/* Left Side - Brand & Visuals */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 lg:p-20 text-white">
                {/* Background Gradients & Glows */}
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-violet-500/20 blur-[120px] mix-blend-screen" />

                {/* Abstract grid pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"></div>

                <div className="relative z-10 flex items-center gap-3 mb-10">
                    <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
                        <LayoutTemplate className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">OpenCMS</span>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">
                    <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                            Welcome back to the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300">future of content.</span>
                        </h1>
                        <p className="text-slate-400 text-md mb-12 leading-relaxed">
                            Sign in to access your headless CMS dashboard, manage pages, and monitor your platform's web traffic in real-time.
                        </p>
                    </div>

                    {/* Floating Cards Display */}
                    <div className={`relative h-64 w-full transition-all duration-1000 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="absolute top-0 left-0 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 p-5 rounded-2xl shadow-2xl w-64 transform -rotate-6 animate-pulse hover:rotate-0 transition-all duration-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200">Page Published</p>
                                    <p className="text-xs text-slate-400">/blog/new-release</p>
                                </div>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full w-full overflow-hidden">
                                <div className="h-full bg-emerald-400 w-full"></div>
                            </div>
                        </div>

                        <div className="absolute top-12 left-32 bg-slate-800/90 backdrop-blur-md border border-slate-700/50 p-5 rounded-2xl shadow-2xl w-72 transform rotate-3 z-10 hover:-rotate-2 transition-all duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-200">Monthly Traffic</p>
                                        <p className="text-xs text-slate-400">Updated just now</p>
                                    </div>
                                </div>
                                <span className="text-emerald-400 text-xs font-bold">+24.5%</span>
                            </div>
                            <div className="flex items-end gap-1 h-12 mt-2">
                                {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500/40 rounded-t-sm relative group">
                                        <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <div className="flex -space-x-3">
                        <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900" />
                        <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900" />
                        <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900" />
                    </div>
                    <span>Trusted by incredible digital teams</span>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative bg-white">

                {/* Mobile Header (Hidden on LG) */}
                <div className="absolute top-8 left-8 flex items-center gap-2 lg:hidden">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <LayoutTemplate className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">OpenCMS</span>
                </div>

                <div className={`w-full max-w-[420px] transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-slate-500 font-medium">Welcome back, here's what's happening with <span className="text-indigo-600">OpenCMS</span> today.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all text-sm font-normal placeholder:text-slate-400 text-slate-900 shadow-sm"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all text-sm font-normal placeholder:text-slate-400 text-slate-900 shadow-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 mb-8">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-4.5 h-4.5 border-2 border-slate-300 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all shadow-sm"></div>
                                    <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
                                </div>
                                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="font-bold text-sm text-indigo-600 hover:text-indigo-700 transition-colors">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign in to Dashboard
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm font-medium text-slate-500 mt-10">
                        Don't have an account yet?{' '}
                        <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors border-b-2 border-transparent hover:border-indigo-600 pb-0.5">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
