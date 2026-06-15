import { ImmersiveScene } from './sections/ImmersiveScene';
import { HeroSection } from './sections/HeroSection';

function App() {
  return (
    <main className="relative bg-midnight min-h-screen">
      {/* Background 3D Scene */}
      <ImmersiveScene />
      
      {/* Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        
        {/* Additional sections can be added here */}
        <section className="min-h-screen flex items-center justify-center px-6 parallax-section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Crafted with Precision
            </h2>
            <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto">
              Every pixel, every animation, every interaction designed to captivate 
              and convert. This is not just a website—it's an experience.
            </p>
          </div>
        </section>
        
        <section className="min-h-screen flex items-center justify-center px-6 parallax-section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gold mb-6">
              Premium Value
            </h2>
            <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto">
              Projects like this command $5,000-$15,000+ because they combine 
              artistic vision with technical excellence.
            </p>
          </div>
        </section>
        
        <footer className="py-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="font-body text-gray-400">
              © 2024 Luminia AI. Built with React Three Fiber, GSAP, and custom GLSL shaders.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
