'use client';

import { useRouter } from 'next/navigation';
import PhoneMockup from '@/components/PhoneMockup';
import { FaMoneyBillWave, FaUserFriends, FaCalculator } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  const navigateToSplit = () => {
    router.push('/split');
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container mx-auto section-padding">
          <div className="hero-content grid items-center gap-12 px-6 md:grid-cols-2">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
                Split Bills Effortlessly
              </span>
              <h1 className="hero-title">
                Smart Bill
                <br />
                Splitting Made
                <br />
                <span className="text-8xl md:text-9xl">Simple</span>
              </h1>
              <p className="hero-subtitle">
                The fastest way to split expenses with friends and family.
                No more awkward calculations or confusion.
              </p>
              <div className="hero-buttons">
                <a 
                  href="/split"
                  className="primary-btn inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-bold text-white transition-all hover:shadow-lg hover:translate-y-[-2px] cursor-pointer mr-4"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    textDecoration: 'none'
                  }}
                >
                  Try Bill Splitter
                </a>
                <a 
                  href="#features" 
                  className="secondary-btn inline-flex items-center justify-center rounded-2xl border-2 px-8 py-4 text-lg font-bold transition-all hover:shadow-lg hover:translate-y-[-2px] cursor-pointer"
                  style={{ 
                    borderImage: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end)) 1',
                    color: 'var(--gradient-start)'
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-[3rem] blur-3xl" />
              <div className="relative float-animation">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto section-padding px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
            Why Choose Us?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Split Bills Without The Hassle
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our smart bill splitting tool makes it easy to manage shared expenses and keep track of who owes what.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaMoneyBillWave className="w-full h-full" />
            </div>
            <h3 className="feature-title">Quick Splitting</h3>
            <p className="feature-description">
              Split bills instantly with our intuitive interface. No more manual calculations needed.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserFriends className="w-full h-full" />
            </div>
            <h3 className="feature-title">Group Friendly</h3>
            <p className="feature-description">
              Perfect for groups of any size. Everyone pays their fair share, every time.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalculator className="w-full h-full" />
            </div>
            <h3 className="feature-title">Smart Calculations</h3>
            <p className="feature-description">
              Handles complex splits and uneven amounts with ease and perfect accuracy.
            </p>
          </div>
        </div>
      </section>

      <section id="cta" className="container mx-auto pb-24 px-6">
        <div className="gradient-border rounded-3xl p-12 text-center bg-primary/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Split Your Bill?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who make bill splitting easy with our tool.
          </p>
          
          <a 
            href="/split"
            className="primary-btn inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-bold text-white transition-all hover:shadow-lg hover:translate-y-[-2px] cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
              textDecoration: 'none',
              zIndex: 999,
              position: 'relative'
            }}
          >
            Start Splitting Now
          </a>
        </div>
      </section>
    </main>
  );
}
