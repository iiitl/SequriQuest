export default function Footer() {
    return (
      <footer className="bg-black text-green-400 py-6 border-t border-green-500">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          
          {/* Left Section - Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-mono font-bold">SEQURIQUEST<span className="text-green-500">_</span></h2>
            <p className="text-green-300 text-sm">Made with 💓 </p>
            <p className="text-green-300 text-sm">by the Infosec Club of IIITL</p>
          </div>
  
          {/* Center Section - Terminal-Style Message */}
          <div className="hidden md:block">
            <p className="text-green-300 text-sm font-mono">
              [~] System Integrity: <span className="text-green-500">SECURE</span>
            </p>
            <p className="text-green-300 text-sm font-mono">
              [~] Threat Level: <span className="text-red-500">LOW</span>
            </p>
          </div>
  
          {/* Right Section - Navigation */}
          <div className="flex space-x-4">
            <p className="text-green-300 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
  
        </div>
      </footer>
    );
  }
  