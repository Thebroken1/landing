import './Toolbar.css';
import logo from '../logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';


function Toolbar(){
    return(
        
        <div className='toolbarBody'>
           
            <div className='img'>
            <img src= {logo} alt = "logo" className='logo'/>  
            </div>

            <div className='tools'>
                <p className='title'>Study In Germany</p>
                <a href="#hero">Home</a>
                <a href="#howitworks">How It Works</a>
                <a href="#programs">Programs</a>
                <a href="#pricing">Pricing</a>
                <a href="#contactus">Contact Us</a>
                    <Dropdown>
                    <Dropdown.Toggle variant="success" id="lang">
                        Lang
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/en">EN</Dropdown.Item>
                        <Dropdown.Item href="#/ar">AR</Dropdown.Item>
                        <Dropdown.Item href="#/de">DE</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
            </div>
        </div>
    )
}

export default Toolbar;