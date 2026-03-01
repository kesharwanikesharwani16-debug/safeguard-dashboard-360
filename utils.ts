import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  RefreshCw, 
  Settings, 
  History, 
  Lock, 
  Globe, 
  Cpu, 
  Bell,
  ChevronRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  CreditCard,
  Star,
  Users,
  Download,
  ExternalLink,
  Menu,
  X,
  Activity,
  Wifi,
  Database,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Notification Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'info' | 'success' | 'warning', onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
      type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
      type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
      'bg-blue-500/10 border-blue-500/20 text-blue-400'
    } backdrop-blur-xl`}
  >
    {type === 'success' ? <CheckCircle2 size={20} /> : type === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
    <p className="font-medium">{message}</p>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
      <X size={16} />
    </button>
  </motion.div>
);

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [toasts, setToasts] = useState<{ id: number, message: string, type: 'info' | 'success' | 'warning' }[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // PWA Install Logic
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install prompt after 5 seconds
      setTimeout(() => setShowInstallModal(true), 5000);
    });

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      showToast('SafeGuard 360 installed successfully!', 'success');
    });
  }, []);

  const showToast = (message: string, type: 'info' | 'success' | 'warning') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    showToast('Smart Scan initiated...', 'info');
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          showToast('Scan complete. Your system is secure.', 'success');
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallModal(false);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'success');
  };

  const menuItems = [
    { id: 'dashboard', icon: Shield, label: 'Dashboard' },
    { id: 'security', icon: Lock, label: 'Device Security' },
    { id: 'identity', icon: Users, label: 'Identity Safety' },
    { id: 'privacy', icon: Globe, label: 'Online Privacy' },
    { id: 'performance', icon: Cpu, label: 'Performance' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-norton-dark text-white flex overflow-hidden norton-gradient">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="glass border-r border-white/5 flex flex-col z-50"
      >
        <div className="p-6 flex items-center gap-4 border-bottom border-white/5">
          <div className="w-10 h-10 bg-norton-yellow rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,210,0,0.3)]">
            <Shield className="text-black" size={24} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight"
            >
              SafeGuard <span className="text-norton-yellow">360</span>
            </motion.span>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-norton-yellow text-black font-bold shadow-lg' 
                : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={22} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleInstallClick}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-norton-yellow`}
          >
            <Download size={22} />
            {isSidebarOpen && <span className="font-bold">Install App</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-medium text-neutral-400">
              System Status: <span className="text-emerald-400 font-bold">Protected</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
              <CheckCircle2 size={16} />
              Real-time Protection Active
            </div>
            <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-norton-yellow rounded-full shadow-[0_0_10px_rgba(255,210,0,0.5)]"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-norton-yellow to-yellow-600 flex items-center justify-center font-bold text-black">
              JD
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl glass p-12 border border-white/10">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-norton-yellow/10 border border-norton-yellow/20 rounded-full text-norton-yellow text-xs font-bold uppercase tracking-wider">
                    <Zap size={14} />
                    Premium Protection
                  </div>
                  <h1 className="text-5xl font-bold leading-tight">
                    Your Digital Life, <br />
                    <span className="text-norton-yellow">Completely Secured.</span>
                  </h1>
                  <p className="text-neutral-400 text-lg leading-relaxed">
                    Advanced multi-layered security for your devices, identity, and online privacy. 
                    NORT0N360 keeps you safe from evolving cyber threats.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={startScan}
                      disabled={isScanning}
                      className="px-8 py-4 bg-norton-yellow text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all flex items-center gap-3 shadow-xl shadow-norton-yellow/20 disabled:opacity-50"
                    >
                      {isScanning ? <RefreshCw className="animate-spin" size={20} /> : <Shield size={20} />}
                      {isScanning ? `Scanning... ${scanProgress}%` : 'Run Smart Scan'}
                    </button>
                    <button 
                      onClick={handleInstallClick}
                      className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3"
                    >
                      <Download size={20} />
                      Download Desktop App
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <motion.div 
                    animate={{ 
                      scale: isScanning ? [1, 1.05, 1] : 1,
                      rotate: isScanning ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-64 h-64 bg-norton-yellow/5 rounded-full flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 border-2 border-dashed border-norton-yellow/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="w-48 h-48 bg-norton-yellow/10 rounded-full flex items-center justify-center">
                      <ShieldCheck className="text-norton-yellow" size={100} />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Progress Bar for Scan */}
              {isScanning && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    className="h-full bg-norton-yellow shadow-[0_0_15px_rgba(255,210,0,0.8)]"
                  />
                </div>
              )}
            </section>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Activity, label: 'Threats Blocked', value: '1,284', color: 'text-emerald-400' },
                { icon: Wifi, label: 'Secure VPN', value: 'Active', color: 'text-blue-400' },
                { icon: Database, label: 'Cloud Backup', value: '42.8 GB', color: 'text-purple-400' },
                { icon: Smartphone, label: 'Devices', value: '5 / 10', color: 'text-amber-400' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-2xl border border-white/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Live</span>
                  </div>
                  <h3 className="text-neutral-400 text-sm mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="glass rounded-3xl p-8 border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Security Overview</h2>
                    <button className="text-norton-yellow text-sm font-bold hover:underline">Manage All</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: Lock, title: 'Antivirus & Malware', status: 'Up to date', desc: 'Real-time protection against viruses, ransomware, and spyware.' },
                      { icon: Globe, title: 'Secure VPN', status: 'Connected', desc: 'Browse anonymously and securely with a no-log VPN.' },
                      { icon: Users, title: 'Identity Protection', status: 'Monitored', desc: 'We monitor the dark web for your personal information.' },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-norton-yellow group-hover:text-black transition-all">
                          <feature.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold">{feature.title}</h4>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{feature.status}</span>
                          </div>
                          <p className="text-sm text-neutral-500">{feature.desc}</p>
                        </div>
                        <ChevronRight className="text-neutral-600" size={20} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="glass rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-white/5 to-norton-yellow/5">
                  <h2 className="text-2xl font-bold mb-6">Subscription</h2>
                  <div className="p-6 rounded-2xl bg-norton-yellow/10 border border-norton-yellow/20 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-norton-yellow">Norton 360 Deluxe</span>
                      <Star className="text-norton-yellow" size={16} fill="currentColor" />
                    </div>
                    <p className="text-xs text-neutral-400 mb-4">Next billing date: Oct 24, 2026</p>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-norton-yellow"></div>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <CreditCard size={18} />
                    Manage Billing
                  </button>
                </div>

                <div className="glass rounded-3xl p-8 border border-white/5">
                  <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                  <div className="space-y-6">
                    {[
                      { time: '2h ago', msg: 'Smart Scan completed' },
                      { time: '5h ago', msg: 'VPN connected: London, UK' },
                      { time: 'Yesterday', msg: '3 malicious sites blocked' },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-1 h-10 bg-norton-yellow/20 rounded-full shrink-0"></div>
                        <div>
                          <p className="text-xs text-neutral-500 font-bold uppercase tracking-tighter">{log.time}</p>
                          <p className="text-sm text-neutral-300">{log.msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popups and Notifications */}
      <AnimatePresence>
        {showInstallModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-norton-dark border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-norton-yellow/10 rounded-xl flex items-center justify-center">
                  <Download className="text-norton-yellow" size={24} />
                </div>
                <button onClick={() => setShowInstallModal(false)} className="text-neutral-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Download SafeGuard 360</h3>
              <p className="text-neutral-400 mb-6">To create a desktop icon and install the full application, please follow these steps:</p>
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-norton-yellow text-black flex items-center justify-center text-sm font-bold shrink-0">1</div>
                  <div className="space-y-3 flex-1">
                    <p className="text-sm text-neutral-300">Browser security requires you to open the app in a full tab first.</p>
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href={window.location.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-norton-yellow text-black text-xs font-bold rounded-lg hover:bg-yellow-400 transition-all"
                      >
                        Open in New Tab <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-norton-yellow text-black flex items-center justify-center text-sm font-bold shrink-0">2</div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-300">In the new tab, click the <span className="text-white font-bold">Install</span> icon in your address bar or browser menu.</p>
                    <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
                      <div className="w-6 h-6 bg-neutral-700 rounded flex items-center justify-center">
                        <Download size={12} className="text-white" />
                      </div>
                      <span className="text-xs text-neutral-400 italic">Look for this icon in your browser's top right corner</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-norton-yellow text-black flex items-center justify-center text-sm font-bold shrink-0">3</div>
                  <p className="text-sm text-neutral-300">Confirm <span className="text-white font-bold">"Install"</span> to create the desktop shortcut and start the app.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowInstallModal(false)}
                className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}

        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default App;
