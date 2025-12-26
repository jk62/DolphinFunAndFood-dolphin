
import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <div className="bg-transparent flex flex-col relative z-10 w-full">
      {/* Social Media Section - White Card */}
      {/* 
      <div className="max-w-7xl mx-auto px-4 w-full mb-[-3rem] relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <Instagram className="text-pink-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">@DolphinFunFood</h3>
            </div>
            <a href="#" className="text-[#FF9900] text-sm font-bold hover:underline">Follow Us</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all">
              <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596740926474-00539540438a?q=80&w=2070&auto=format&fit=crop")' }}></div>
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all">
              <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop")' }}></div>
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all">
              <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=687&auto=format&fit=crop")' }}></div>
            </div>
            <div className="aspect-square bg-[#003366] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#004080] transition-colors group">
              <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">+120</span>
            </div>
          </div>
        </div>
      </div>
      */}

      {/* Main Footer Section - Dark Blue */}
      <footer className="bg-[#003366] text-white pt-24 pb-10 rounded-t-[3rem] mt-[-2rem] relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-10">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-[#FF9900] p-1.5 rounded-full text-[#003366]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                Dolphin Fun & Food
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                The ultimate destination for family fun, exquisite dining, and grand celebrations in the heart of NCR.
              </p>
              <div className="flex flex-col gap-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FF9900] shrink-0 mt-1" />
                  <span>64th milestone, NH-1, Ganaur, Haryana 131101</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#FF9900] shrink-0" />
                  <span>+91 9311918485</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#FF9900] shrink-0" />
                  <span>Open 24 Hours</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#00EAFF] mb-6 text-lg">Explore</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Water Park</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Fine Dining</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Fun Zone</Link></li>
                <li><Link href="/banquet-enquiry" className="hover:text-white hover:translate-x-1 transition-all inline-block">Banquets</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Book Tickets</Link></li>
              </ul>
            </div>

            <div id="location-map" className="scroll-mt-24">
              <h4 className="font-bold text-[#00EAFF] mb-6 text-lg">Plan Your Visit</h4>
              <div className="rounded-2xl overflow-hidden h-40 bg-gray-800 relative group border border-white/10">
                {/* Map Placeholder - Link to Google Maps */}
                <a 
                  href="https://maps.app.goo.gl/R9DnVJBfFdkUCeeo8?g_st=iw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                >
                  <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=2662")' }} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white text-[#003366] px-5 py-2.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-[#FF9900] hover:text-white transition-all transform hover:scale-105">
                      <MapPin size={16} /> Get Directions
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="md:col-span-1">
               {/* Last column left empty in sample for balance or future use handled by grid adjustment */}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© {new Date().getFullYear()} Dolphin Fun & Food. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
