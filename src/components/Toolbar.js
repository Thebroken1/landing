import './Toolbar.css';
import logo from '../logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function Toolbar({ changeLanguage, strings, currentLang }) {

  const t = (key, fallback) => {
    if (!strings) return fallback || '';
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
    <div className='toolbarBody'>
      <div className='img'>
        <img src={logo} alt="logo" className='logo' />
      </div>

      <div className='tools'>
        <p className='title'>{t('toolbar.title', 'Study In Germany')}</p>
        <a href="#hero">{t('toolbar.home', 'Home')}</a>
        <a href="#howitworks">{t('toolbar.howitworks', 'How It Works')}</a>
        <a href="#programs">{t('toolbar.programs', 'Programs')}</a>
        <a href="#pricing">{t('toolbar.pricing', 'Pricing')}</a>
        <a href="#contactus">{t('toolbar.contact', 'Contact Us')}</a>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="lang">
            {currentLang ? currentLang.toUpperCase() : 'LANG'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLanguage('en')}>EN</Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage('ar')}>AR</Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage('de')}>DE</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Toolbar;
