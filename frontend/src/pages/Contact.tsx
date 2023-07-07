import React from 'react';
import Header from '../components/UI/Header';
import { Contact } from '../components/contents/Contact/Contact';
import Footer from '../components/UI/Footer';

const ContactPage: React.FC = () => {
  return (
    <>
    <Header />
    <Contact />
    <Footer />
    </>

  );
}

export default ContactPage;