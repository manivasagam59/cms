import { useState } from 'react';
import {
    Check,
    Zap,
    Plus,
    Minus,
    PenTool,
    Globe,
    Users,
    Shield,
    Moon,
    Sun,
    LayoutTemplate,
    Code,
    Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';

const App = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [openFaq, setOpenFaq] = useState(0);
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const stats = [
        { label: "Page Load Speed", value: "< 0.5s" },
        { label: "Uptime SLA", value: "99.99%" },
        { label: "Faster Publishing", value: "10x" },
        { label: "Global Edge Nodes", value: "250+" },
    ];

    const faqs = [
        { q: "Is it easy to migrate from WordPress?", a: "Yes, our automated migration tool imports your posts, pages, and media from WordPress in just one click." },
        { q: "Can I use OpenCMS as a headless CMS?", a: "Absolutely! Every piece of content is instantly available via our lightning-fast GraphQL and REST APIs." },
        { q: "Are there any limits on bandwidth or storage?", a: "Our premium plans offer generous limits that easily support millions of monthly visitors without extra charges." }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <LayoutTemplate className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">OpenCMS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#solutions" className="hover:text-indigo-600 transition-colors">Solutions</a>
                        <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
                        <a href="#resources" className="hover:text-indigo-600 transition-colors">Resources</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors dark:hover:bg-slate-800"
                        >
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button className="text-sm font-semibold px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors" onClick={() => navigate('/login')}>Log in</button>
                        <button className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">Get started</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative">
                    {/* Background Glows */}
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-100/50 rounded-full blur-[120px] -z-10" />

                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                        The modern way to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">build and manage your web presence</span>
                    </h1>
                    <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Say goodbye to bloated legacy systems. Empower your team with a blazingly fast, visually intuitive Content Management System designed for the modern web.
                    </p>
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 mb-16">
                        Start building for free
                    </button>

                    {/* Floating UI Mockup */}
                    <div className="relative mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-4 overflow-hidden">
                            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                                <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                            <PenTool className="text-white w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-sm">Dashboard / Page Editor</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-24 h-8 rounded-lg bg-slate-100" />
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs" >Pub</div>
                                    </div>
                                </div>
                                <div className="p-6 grid grid-cols-12 gap-6">
                                    <div className="col-span-8 space-y-4">
                                        <div className="h-48 rounded-xl bg-white border border-slate-200 p-4 flex flex-col gap-3">
                                            <div className="h-8 w-3/4 bg-slate-100 rounded-lg"></div>
                                            <div className="h-4 w-full bg-slate-50 rounded"></div>
                                            <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
                                            <div className="h-16 w-full mt-2 bg-indigo-50/50 border border-dashed border-indigo-200 rounded-lg flex items-center justify-center text-indigo-400 text-sm font-medium">
                                                Drag & Drop Image Here
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-20 rounded-xl bg-white border border-slate-200 flex p-4 items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                                                <div className="flex-1 h-6 bg-slate-50 rounded"></div>
                                            </div>
                                            <div className="h-20 rounded-xl bg-white border border-slate-200 flex p-4 items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                                                <div className="flex-1 h-6 bg-slate-50 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 bg-slate-900 rounded-2xl p-6 text-white text-left">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">SEO Assistant</span>
                                        </div>
                                        <p className="text-sm font-medium mb-6">"Your content looks great! Add a meta description to improve your search visibility."</p>
                                        <button className="w-full bg-indigo-600 py-3 rounded-xl text-xs font-bold">Optimize Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating Accents */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-48 bg-violet-100/50 rounded-full blur-3xl -z-10" />
                        <div className="absolute -right-12 bottom-0 w-48 h-48 bg-fuchsia-100/50 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </section>

            {/* Simplified Bento Section */}
            <section id="features" className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Content management, perfected</h2>
                        <p className="text-slate-500">Everything you need to create amazing digital experiences.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="lg:col-span-2 bg-indigo-50 rounded-[2.5rem] p-10 border border-indigo-50/50 relative overflow-hidden group">
                            <div className="max-w-md relative z-10">
                                <h3 className="text-2xl font-bold mb-3">Intuitive Visual Editor</h3>
                                <p className="text-slate-600 mb-6">Build beautiful pages visually with our block-based editor. No coding required, just pure creativity.</p>
                                <button className="bg-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all">See it in action</button>
                            </div>
                            <div className="absolute bottom-0 right-0 w-1/2 h-full flex items-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-full h-2/3 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-xl p-4 flex flex-col gap-2">
                                    <div className="h-4 w-3/4 bg-indigo-100 rounded" />
                                    <div className="h-4 w-1/2 bg-slate-100 rounded" />
                                    <div className="h-12 w-full bg-slate-50 border border-dashed border-slate-200 rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-violet-50/50 group">
                            <h3 className="text-2xl font-bold mb-3">Headless Ready</h3>
                            <p className="text-slate-600 mb-6">Ship content to any device effortlessly using our rich GraphQL and REST APIs.</p>
                            <button className="bg-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm">View docs</button>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-emerald-50/50">
                            <h3 className="text-2xl font-bold mb-3">Built-in SEO</h3>
                            <p className="text-slate-600">Automated sitemaps, semantic HTML, and metadata handling to help you rank higher.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="lg:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 relative overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-3">Team Collaboration</h3>
                                    <p className="text-slate-600">Advanced roles and publishing workflows ensure the right content goes live at the right time.</p>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3 gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <Users className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 h-3 bg-slate-100 rounded-full"></div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 px-6 border-y border-slate-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Designed for massive scale</h2>
                        <p className="text-slate-500">Unmatched performance and reliability.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{stat.value}</div>
                                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Grid */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-8 italic text-slate-400">Powering millions of websites worldwide</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center opacity-40 grayscale">
                            <div className="text-2xl font-black">Next.js</div>
                            <div className="text-2xl font-black italic">React</div>
                            <div className="text-2xl font-black tracking-tighter">Gatsby</div>
                            <div className="text-2xl font-black">Vue</div>
                            <div className="text-2xl font-black">Svelte</div>
                        </div>
                    </div>

                    {/* Integration Icons Grid */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {[Code, Smartphone, Globe, PenTool, LayoutTemplate, Shield, Zap].map((Icon, i) => (
                            <div key={i} className="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                                <Icon className="w-6 h-6 text-slate-400" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-4">Simple pricing based <br />on your team size</h2>
                            <p className="text-slate-500">Start for free or upgrade to enterprise features.</p>
                        </div>
                        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                            >
                                Yearly <span className="text-emerald-500 ml-1 font-normal">-20%</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {/* Plan 1 */}
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col">
                            <div className="mb-8">
                                <div className="text-slate-400 font-bold text-sm uppercase mb-4">Hobby</div>
                                <div className="text-5xl font-black mb-2">Free</div>
                                <div className="text-slate-500 text-sm">forever</div>
                            </div>
                            <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold mb-8 hover:bg-slate-50 transition-colors">Start Building</button>
                            <ul className="space-y-4 flex-grow">
                                {['1 Project', '1,000 CMS Items', 'Community Support', 'Basic CDN'].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Plan 2 - Featured */}
                        <div className="bg-indigo-50 p-10 rounded-[2.5rem] border border-indigo-200 flex flex-col relative scale-105 shadow-2xl shadow-indigo-100 z-10">
                            <div className="absolute top-0 right-10 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Pro</div>
                            <div className="mb-8">
                                <div className="text-indigo-600 font-bold text-sm uppercase mb-4">Business</div>
                                <div className="text-5xl font-black mb-2">${billingCycle === 'monthly' ? '49' : '39'}</div>
                                <div className="text-slate-500 text-sm">per month, billed {billingCycle}</div>
                            </div>
                            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold mb-8 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">Upgrade to Pro</button>
                            <ul className="space-y-4 flex-grow">
                                {['Unlimited Projects', '100,000 CMS Items', 'Custom Domains', 'Priority Support', 'Advanced Workflows'].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                        <Check className="w-4 h-4 text-indigo-600 stroke-[3]" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Plan 3 */}
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col">
                            <div className="mb-8">
                                <div className="text-slate-400 font-bold text-sm uppercase mb-4">Enterprise</div>
                                <div className="text-5xl font-black mb-2">Custom</div>
                                <div className="text-slate-500 text-sm">tailored for scale</div>
                            </div>
                            <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold mb-8 hover:bg-slate-50 transition-colors">Contact Sales</button>
                            <ul className="space-y-4 flex-grow">
                                {['Unlimited CMS Items', 'Dedicated Account Manager', 'SLA Guarantees', 'Custom Integrations', 'Single Sign-On (SSO)'].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <Check className="w-4 h-4 text-indigo-400 stroke-[3]" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-6 bg-white overflow-hidden relative">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-16 max-w-xl leading-tight">Trusted by incredible digital teams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 backdrop-blur-sm relative">
                            <p className="text-xl font-medium italic text-slate-700 mb-10 leading-relaxed">
                                "The most elegant CMS I've used. Unlike legacy platforms, OpenCMS feels incredibly fast, modern, and it empowers our marketing team to publish instantly."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200" />
                                <div>
                                    <div className="font-bold text-slate-900">Sarah Jenkins</div>
                                    <div className="text-sm text-slate-500">VP of Marketing, TechCorp</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 backdrop-blur-sm">
                            <p className="text-xl font-medium italic text-slate-700 mb-10 leading-relaxed">
                                "We reduced our publishing workflow time from days to hours. The block editor and deep Next.js integration are absolute game changers."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200" />
                                <div>
                                    <div className="font-bold text-slate-900">Mark Thompson</div>
                                    <div className="text-sm text-slate-500">Lead Engineer, DesignCo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-12">Frequently asked questions</h2>
                    <div className="space-y-4 text-left">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    className="w-full px-6 py-5 flex items-center justify-between font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                                >
                                    {faq.q}
                                    {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed animate-in slide-in-from-top-2">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">Smarter, faster <br />content delivery</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all">Start building for free</button>
                        <button className="bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all">Schedule Demo</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-24 pb-12 px-6 border-t border-slate-100 text-slate-500">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-slate-900 p-1 rounded-lg">
                                    <LayoutTemplate className="text-white w-4 h-4" />
                                </div>
                                <span className="text-xl font-bold text-slate-900">OpenCMS</span>
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed mb-6">
                                The headless content management system built for developers and loved by creators.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 mb-6 text-sm">Product</h5>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#" className="hover:text-indigo-600">Visual Editor</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Headless API</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Integrations</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 mb-6 text-sm">Company</h5>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Customers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 mb-6 text-sm">Resources</h5>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#" className="hover:text-indigo-600">Documentation</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Community</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
                        <p>© 2024 OpenCMS Inc. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-indigo-600">Twitter</a>
                            <a href="#" className="hover:text-indigo-600">GitHub</a>
                            <a href="#" className="hover:text-indigo-600">Status</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;