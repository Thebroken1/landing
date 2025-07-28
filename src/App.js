import './App.css';
import Toolbar from './components/Toolbar.js';
import Banner from './components/Banner.js';
import ContactUs from './components/ContactUs.js';
import Button from 'react-bootstrap/Button';
import {arc,bus,cs,eng,hu,med} from './images/Images.js'

function App() {
  function scroll() {
    const contactSection = document.getElementById('contactus');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className="App">
      
      <div className="hero" id='hero'>
        <div className= "Top">
          <Toolbar />
        </div>
        <div className="banner">
          <Banner />
        </div>
      </div>

      <div className='howitworks' id='howitworks'>
        <p className='text'> How It Works</p>
        <div className='step'>
          <div className='step2'>
          <p className='text2'>1. Identify the Correct Visa/Residence Permit:</p>
          <p className='para'>Germany offers various visas and residence permits depending on your purpose of stay (e.g., work, study, family reunification). Determine which one aligns with your situation. </p>
          </div>
          </div>
        <div className='step'>
          <div className='step2'>
          <p className='text2'>2. Gather Required Documents:</p>
          <p className='para'>Each visa/permit has specific document requirements. Common documents include your passport, proof of financial means, proof of health insurance, and documents relevant to your purpose of stay (e.g., job offer, university acceptance letter). </p>
          </div>
        </div>
        <div className='step'>
          <div className='step2'>
          <p className='text2'>3. Apply through the German Authority:</p>
          <p className='para'>Depending on your visa type, you may apply online through a portal like VIDEX, or you may need to schedule an appointment at a German embassy or consulate. During the application process, you'll submit your documents and potentially undergo an interview or provide biometric information. </p>
        </div>
        </div>
      </div>

      <div className='programs' id='programs'>
        <p className='text'> Programs </p>
      <div className='r1'>
        <div className='box' onClick={scroll}><img src={eng} alt="eng" /><p className='boxes'>Engineering</p></div>
        <div className='box' onClick={scroll}><img src={med} alt="med" /><p className='boxes'>Medicine</p></div>
        <div className='box' onClick={scroll}><img src={cs} alt="cs" /><p className='boxes'>Computer Science</p></div>
      </div>
      <div className='r2'>
        <div className='box' onClick={scroll}><img src={bus} alt="bu" /><p className='boxes'>Business</p></div>
        <div className='box' onClick={scroll}><img src={arc} alt="ar" /><p className='boxes'>Architecture</p></div>
        <div className='box' onClick={scroll}><img src={hu} alt="hu" /><p className='boxes'>Humanities</p></div>
      </div>
      </div>

      <div className='pricing' id='pricing'>
        <p className='text'>Pricing</p>
        <div className='tier'>
          <p className='tierHeader'>Basic</p>
            <ul className='tierFeatures'>
              <li>General Visa Consultation</li>
              <li>Basic Document Checklist</li>
              <li>Email Support</li>
              <li>Access to FAQ Portal</li>
            </ul>
            <p className='tierPrice'>$100 Application Fee</p>
            <Button as="input" type="button" value="Apply Now" className="cta-button" onClick={scroll}/>
        </div>
        <div className='tier'>
          <p className='tierHeader'>Boosted</p>
            <ul className='tierFeatures'>
              <li>Everything in Basic</li>
              <li>1-on-1 Consultation Call</li>
              <li>Document Review & Feedback</li>
              <li>Priority Email Support</li>
            </ul>
            <p className='tierPrice'>$50 + $100 Application Fee</p>
            <Button as="input" type="button" value="Apply Now" className="cta-button" onClick={scroll}/>
        </div>
        <div className='tier'>
          <p className='tierHeader'>Premium</p>
            <ul className='tierFeatures'>
              <li>Everything in Boosted</li>
              <li>Personal Case Manager</li>
              <li>Application Form Assistance</li>
              <li>Mock Interview Preparation</li>
              <li>24/7 Priority Support</li>
            </ul>
            <p className='tierPrice'>$150 + $100 Application Fee</p>
            <Button as="input" type="button" value="Apply Now" className="cta-button" onClick={scroll}/>
        </div>
      </div>

      <div className='contactus' id='contactus'>
        <div className='contact'>
          <ContactUs />
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#hero">Home</a>
            <a href="#howitworks">How It Works</a>
            <a href="#programs">Programs</a>
            <a href="#pricing">Pricing</a>
            <a href="#contactus">Contact Us</a>
          </div>
          <div className="footer-contact">
            <p>Email: info@example.com</p>
          </div>
          <div className="footer-copy">
            <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
