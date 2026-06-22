import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User, LayoutTemplate, ArrowRight, Server, ShieldCheck, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => navigate('/practice-dashboard'), 800); // Route might need updates, keeping as is
    };

    return (
        <div className="min-h-screen w-full flex bg-[#FDFEFF] font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">
            {/* Left Side - Brand & Visuals */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 lg:p-20 text-white">
                {/* Background Gradients & Glows */}
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-violet-500/10 blur-[120px] mix-blend-screen" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen" />

                {/* Abstract grid pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"></div>

                <div className="relative z-10 flex items-center gap-3 mb-4">
                    <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
                        <LayoutTemplate className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">OpenCMS</span>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">
                    <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                            Start building <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">at peak efficiency.</span>
                        </h1>
                        <p className="text-slate-400 text-sm lg:text-base mb-12 leading-relaxed">
                            Join over 2,000 forward-thinking teams scaling their digital presence seamlessly. Fast setup. No bloated infrastructure.
                        </p>
                    </div>

                    {/* Floating Info Cards */}
                    <div className={`space-y-4 max-w-sm transition-all duration-1000 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="pl-6 border-l-2 border-emerald-500">
                            <h3 className="font-bold text-slate-100 flex items-center gap-2 mb-1">
                                <Zap className="text-emerald-500 w-4 h-4" /> Global Edge CDN
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Deliver lightning-fast content to your users worldwide with our built-in edge network.</p>
                        </div>
                        <div className="pl-6 border-l-2 border-indigo-500">
                            <h3 className="font-bold text-slate-100 flex items-center gap-2 mb-1">
                                <Server className="text-indigo-500 w-4 h-4" /> Headless Architecture
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Consume your content anywhere via fully typed GraphQL and REST APIs.</p>
                        </div>
                        <div className="pl-6 border-l-2 border-violet-500">
                            <h3 className="font-bold text-slate-100 flex items-center gap-2 mb-1">
                                <ShieldCheck className="text-violet-500 w-4 h-4" /> Enterprise Security
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Automated backups, role-based access control, and 99.99% uptime guarantees.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-4 mt-auto">
                    <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" clipRule="evenodd" /></svg>)}
                    </div>
                    <span className="text-sm text-slate-400 font-medium">Top Rated Headless CMS 2024</span>
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
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight lg:mt-0 mt-8 mb-2">Create Account</h2>
                        <p className="text-slate-500 font-medium text-sm">Launch your modern content platform today.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <User size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all text-sm font-normal placeholder:text-slate-400 text-slate-900 shadow-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="jane@company.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all text-sm font-normal placeholder:text-slate-400 text-slate-900 shadow-sm"
                                        required
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

                        <div className="flex items-center gap-2.5 mt-6 mb-8 p-1">
                            <input type="checkbox" id="terms" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5" required />
                            <label htmlFor="terms" className="text-sm font-medium text-slate-600 leading-snug">
                                By signing up, you agree to the <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Terms of Service</a> & <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Privacy Policy</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Free Account
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm font-medium text-slate-500 mt-10">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors border-b-2 border-transparent hover:border-indigo-600 pb-0.5">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
