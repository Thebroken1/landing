import './App.css';
import Toolbar from './components/Toolbar.js';
import Banner from './components/Banner.js';
import ContactUs from './components/ContactUs.js';
import Button from 'react-bootstrap/Button';
import { arc, bus, cs, eng, hu, med } from './images/Images.js';
import { useEffect, useState } from 'react';

function App() {
  const [lang, setLang] = useState('en');
  const [strings, setStrings] = useState({});

  const fetchLanguage = (language) => {
    return fetch(`/GetLang.php?lang=${language}`)
      .then(res => {
        if (!res.ok) throw new Error('Language file not found');
        return res.json();
      })
      .then(data => {
        console.log("Fetched strings for lang:", data.lang, data.strings);
        setLang(data.lang);
        setStrings(data.strings);
        document.body.dir = data.lang === 'ar' ? 'rtl' : 'ltr';
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    const urlHashLang = window.location.hash.split('/')[1];
    if (urlHashLang && ['en', 'ar', 'de'].includes(urlHashLang)) {
      fetchLanguage(urlHashLang);
    } else {
      fetchLanguage('en');
    }
  }, []);


  const changeLang = (newLang) => {
    fetchLanguage(newLang);
    window.location.hash = `#/${newLang}`; 
  };


  function scroll() {
    const contactSection = document.getElementById('contactus');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }


  const t = (key, fallback) => {
    if (!strings || Object.keys(strings).length === 0) return fallback || '';

    const keys = key.split('.');
    let result = strings;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return fallback || '';
      }
    }

    return typeof result === 'string' ? result : fallback || '';
  };


  return (
    <div className="App">

      <div className="hero" id="hero">
        <div className="Top">
          <Toolbar key={lang} changeLanguage={changeLang} strings={strings} currentLang={lang} />
        </div>
        <div className="banner">
          <Banner strings={strings} />
        </div>
      </div>

      <div className="howitworks" id="howitworks">
        <p className="text">{t('howitworks.title', 'How It Works')}</p>

        <div className="step">
          <div className="step2">
            <p className="text2">{t('howitworks.step1.title', '1. Identify the Correct Visa/Residence Permit:')}</p>
            <p className="para">{t('howitworks.step1.desc', 'Germany offers various visas and residence permits depending on your purpose of stay (e.g., work, study, family reunification). Determine which one aligns with your situation.')}</p>
          </div>
        </div>

        <div className="step">
          <div className="step2">
            <p className="text2">{t('howitworks.step2.title', '2. Gather Required Documents:')}</p>
            <p className="para">{t('howitworks.step2.desc', 'Each visa/permit has specific document requirements. Common documents include your passport, proof of financial means, proof of health insurance, and documents relevant to your purpose of stay (e.g., job offer, university acceptance letter).')}</p>
          </div>
        </div>

        <div className="step">
          <div className="step2">
            <p className="text2">{t('howitworks.step3.title', '3. Apply through the German Authority:')}</p>
            <p className="para">{t('howitworks.step3.desc', "Depending on your visa type, you may apply online through a portal like VIDEX, or you may need to schedule an appointment at a German embassy or consulate. During the application process, you'll submit your documents and potentially undergo an interview or provide biometric information.")}</p>
          </div>
        </div>
      </div>

      <div className="programs" id="programs">
        <p className="text">{t('programs.title', 'Programs')}</p>
        <div className="r1">
          <div className="box" onClick={scroll}><img src={eng} alt="eng" /><p className="boxes">{t('programs.engineering', 'Engineering')}</p></div>
          <div className="box" onClick={scroll}><img src={med} alt="med" /><p className="boxes">{t('programs.medicine', 'Medicine')}</p></div>
          <div className="box" onClick={scroll}><img src={cs} alt="cs" /><p className="boxes">{t('programs.computerscience', 'Computer Science')}</p></div>
        </div>
        <div className="r2">
          <div className="box" onClick={scroll}><img src={bus} alt="bus" /><p className="boxes">{t('programs.business', 'Business')}</p></div>
          <div className="box" onClick={scroll}><img src={arc} alt="arc" /><p className="boxes">{t('programs.architecture', 'Architecture')}</p></div>
          <div className="box" onClick={scroll}><img src={hu} alt="hu" /><p className="boxes">{t('programs.humanities', 'Humanities')}</p></div>
        </div>
      </div>

      <div className="pricing" id="pricing">
        <p className="text">{t('pricing.title', 'Pricing')}</p>

        <div className="tier">
          <p className="tierHeader">{t('pricing.basic.title', 'Basic')}</p>
          <ul className="tierFeatures">
            <li>{t('pricing.basic.features.0', 'General Visa Consultation')}</li>
            <li>{t('pricing.basic.features.1', 'Basic Document Checklist')}</li>
            <li>{t('pricing.basic.features.2', 'Email Support')}</li>
            <li>{t('pricing.basic.features.3', 'Access to FAQ Portal')}</li>
          </ul>
          <p className="tierPrice">{t('pricing.basic.price', '$100 Application Fee')}</p>
          <Button as="input" type="button" value={t('apply_now', 'Apply Now')} className="cta-button" onClick={scroll} />
        </div>

        <div className="tier">
          <p className="tierHeader">{t('pricing.boosted.title', 'Boosted')}</p>
          <ul className="tierFeatures">
            <li>{t('pricing.boosted.features.0', 'Everything in Basic')}</li>
            <li>{t('pricing.boosted.features.1', '1-on-1 Consultation Call')}</li>
            <li>{t('pricing.boosted.features.2', 'Document Review & Feedback')}</li>
            <li>{t('pricing.boosted.features.3', 'Priority Email Support')}</li>
          </ul>
          <p className="tierPrice">{t('pricing.boosted.price', '$50 + $100 Application Fee')}</p>
          <Button as="input" type="button" value={t('apply_now', 'Apply Now')} className="cta-button" onClick={scroll} />
        </div>

        <div className="tier">
          <p className="tierHeader">{t('pricing.premium.title', 'Premium')}</p>
          <ul className="tierFeatures">
            <li>{t('pricing.premium.features.0', 'Everything in Boosted')}</li>
            <li>{t('pricing.premium.features.1', 'Personal Case Manager')}</li>
            <li>{t('pricing.premium.features.2', 'Application Form Assistance')}</li>
            <li>{t('pricing.premium.features.3', 'Mock Interview Preparation')}</li>
            <li>{t('pricing.premium.features.4', '24/7 Priority Support')}</li>
          </ul>
          <p className="tierPrice">{t('pricing.premium.price', '$150 + $100 Application Fee')}</p>
          <Button as="input" type="button" value={t('apply_now', 'Apply Now')} className="cta-button" onClick={scroll} />
        </div>
      </div>

      <div className="contactus" id="contactus">
        <div className="contact">
          <ContactUs strings={strings}/>
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#hero">{t('footer.home', 'Home')}</a>
            <a href="#howitworks">{t('footer.howitworks', 'How It Works')}</a>
            <a href="#programs">{t('footer.programs', 'Programs')}</a>
            <a href="#pricing">{t('footer.pricing', 'Pricing')}</a>
            <a href="#contactus">{t('footer.contact', 'Contact Us')}</a>
          </div>
          <div className="footer-contact">
            <p>{t('footer.email', 'Email: info@example.com')}</p>
          </div>
          <div className="footer-copyright">
            <p>{t('footer.copyright', '© 2023 Your Company. All rights reserved.')}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
