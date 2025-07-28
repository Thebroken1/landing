import React, { useState } from 'react';
import './ContactUs.css';
import Button from 'react-bootstrap/Button';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    program: '',
    message: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('program', formData.program);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('file', formData.file);

    try {
        const response = await fetch('http://localhost:80/Process.php', {
        method: 'POST',
        body: formDataToSend
        });
        const result = await response.json();
        if (result.status === "success") {
        alert(result.message);
        } else {
        alert(result.errors ? result.errors.join("\n") : result.message);
        }
    } catch (error) {
        alert("Error submitting form.");
    }
    };


  return (
    <div className="contactFormBody">
      <h2>Contact / Apply</h2>
      <form onSubmit={handleSubmit} className="contactForm">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <select
          name="program"
          value={formData.program}
          onChange={handleChange}
          required
        >
          <option value="">Select Program</option>
          <option value="Engineering">Engineering</option>
          <option value="Medicine">Medicine</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Business">Business</option>
          <option value="Architecture">Architecture</option>
          <option value="Humanities">Humanities</option>
        </select>

        <input
          type="file"
          name="file"
          accept=".pdf, .jpg, .png"
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

      <Button as="input" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ContactUs;
