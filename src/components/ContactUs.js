import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ContactUs.css";

function ContactUs({ strings }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    program: "",
    message: "",
    file: null,
  });

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    message: "",
  });

  // Translation helper
  const t = (key, fallback) => {
    if (!strings) {
      console.warn("No translation strings provided");
      return fallback || "";
    }
    if (strings[key]) return strings[key];
    console.warn(`Missing translation key: ${key}`);
    return fallback || "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ show: false, title: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("program", formData.program);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("file", formData.file);

    try {
      const response = await fetch("http://localhost:80/Process.php", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();

      if (result.status === "success") {
        setModalInfo({
          show: true,
          title: t("success_title", "Success"),
          message:
            result.message || t("success_message", "Thank you for your submission!"),
        });
        setFormData({
          name: "",
          email: "",
          country: "",
          program: "",
          message: "",
          file: null,
        });
      } else {
        setModalInfo({
          show: true,
          title: t("error_title", "Error"),
          message:
            result.errors?.join("\n") || result.message || t("error_message", "Submission failed."),
        });
      }
    } catch (error) {
      setModalInfo({
        show: true,
        title: t("error_title", "Error"),
        message: t("submit_error", "Error submitting form. Please try again later."),
      });
    }
  };

  return (
    <div className="contactFormBody">
      <h2>{t("contact_us_header", "Contact / Apply")}</h2>
      <form onSubmit={handleSubmit} className="contactForm">
        <input
          type="text"
          name="name"
          placeholder={t("input_name", "Name")}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder={t("input_email", "Email")}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder={t("input_country", "Country")}
          value={formData.country}
          onChange={handleChange}
          required
        />

        <select name="program" value={formData.program} onChange={handleChange} required>
          <option value="">{t("select_program", "Select Program")}</option>
          <option value="Engineering">{t("program_engineering", "Engineering")}</option>
          <option value="Medicine">{t("program_medicine", "Medicine")}</option>
          <option value="Computer Science">
            {t("program_computer_science", "Computer Science")}
          </option>
          <option value="Business">{t("program_business", "Business")}</option>
          <option value="Architecture">{t("program_architecture", "Architecture")}</option>
          <option value="Humanities">{t("program_humanities", "Humanities")}</option>
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
          placeholder={t("input_message", "Your message")}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <Button as="input" type="submit" value={t("submit_button", "Submit")} />
      </form>

      {/* Modal Popup */}
      <Modal show={modalInfo.show} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{modalInfo.message}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            {t("close_button", "Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContactUs;
