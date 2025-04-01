
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const vaccineInfo = [
    {
      name: "COVID-19",
      description: "Protects against SARS-CoV-2 virus that causes COVID-19 disease",
      doses: "2 doses, 21-28 days apart + boosters as recommended",
      eligibility: "All individuals aged 5 and above",
      icon: (
        <svg className="w-12 h-12 text-vaxtrack-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      )
    },
    {
      name: "Polio",
      description: "Protects against poliovirus that can cause permanent paralysis",
      doses: "4 doses at ages 2 months, 4 months, 6-18 months, and 4-6 years",
      eligibility: "Children under 6 years of age",
      icon: (
        <svg className="w-12 h-12 text-vaxtrack-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    {
      name: "Influenza",
      description: "Protects against seasonal flu viruses",
      doses: "1 dose annually",
      eligibility: "Everyone 6 months and older should get a flu vaccine yearly",
      icon: (
        <svg className="w-12 h-12 text-vaxtrack-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  ];

  const features = [
    {
      title: "Online Registration",
      description: "Register yourself and your family members for vaccination with ease",
      icon: (
        <svg className="w-8 h-8 text-vaxtrack-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
        </svg>
      )
    },
    {
      title: "Center Selection",
      description: "Find and select the nearest vaccination center based on your location",
      icon: (
        <svg className="w-8 h-8 text-vaxtrack-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    },
    {
      title: "Appointment Booking",
      description: "Book your preferred date and time slot for vaccination",
      icon: (
        <svg className="w-8 h-8 text-vaxtrack-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      title: "Digital Certificate",
      description: "Download your vaccination certificate directly from the platform",
      icon: (
        <svg className="w-8 h-8 text-vaxtrack-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: "How do I register on VaxTrack?",
      answer: "You can register by clicking on the 'Register' button on the homepage. Fill in your personal details including name, date of birth, ID proof, phone number, and email address. Once registered, you'll get a confirmation via SMS and email."
    },
    {
      question: "How can I schedule a vaccination appointment?",
      answer: "After logging in, navigate to the 'Book Appointment' section. Search for vaccination centers near you by entering your pin code or district. Select your preferred center, date, and time slot. Confirm your booking to receive an appointment confirmation."
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer: "Yes, you can reschedule or cancel your appointment by logging into your account and navigating to the 'My Appointments' section. Select the appointment you wish to modify and choose either 'Reschedule' or 'Cancel'."
    },
    {
      question: "How do I download my vaccination certificate?",
      answer: "After getting vaccinated, your certificate will be available in your account within 24 hours. Log in to your account, go to the 'Dashboard' section, and click on 'Download Certificate'. You can download it in PDF format."
    },
    {
      question: "What documents should I bring to the vaccination center?",
      answer: "You should bring the ID proof that you used during registration, your appointment confirmation (digital or printed), and any medical history documents if you have pre-existing medical conditions."
    }
  ];

  const stats = [
    { label: "Vaccinations Administered", value: "500M+" },
    { label: "Vaccination Centers", value: "25,000+" },
    { label: "Registered Users", value: "750M+" },
    { label: "Daily Appointments", value: "2.5M+" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="vaxtrack-gradient py-20 md:py-28">
        <div className="container text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Vaccination Journey Made Simple
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Register, book appointments, and track your vaccination status easily with VaxTrack - India's comprehensive vaccination management platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Button asChild size="lg" className="bg-white text-vaxtrack-500 hover:bg-gray-100">
                  <Link to="/book-appointment">Book Appointment</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-white text-vaxtrack-500 hover:bg-gray-100">
                    <Link to="/register">Register Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-vaxtrack-600">
                    <Link to="/login">Login</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-vaxtrack-500">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50" id="how-it-works">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How VaxTrack Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get vaccinated in four simple steps - register, book, get vaccinated, and download your certificate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            {isAuthenticated ? (
              <Button asChild className="bg-vaxtrack-500 hover:bg-vaxtrack-600">
                <Link to="/book-appointment">Book Your Appointment</Link>
              </Button>
            ) : (
              <Button asChild className="bg-vaxtrack-500 hover:bg-vaxtrack-600">
                <Link to="/register">Register Now</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Available Vaccines Section */}
      <section className="py-16 bg-white" id="vaccines">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Vaccines</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn about different vaccines available through our program and their eligibility criteria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vaccineInfo.map((vaccine, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {vaccine.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{vaccine.name}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600"><span className="font-medium">Description:</span> {vaccine.description}</p>
                    <p className="text-gray-600"><span className="font-medium">Doses:</span> {vaccine.doses}</p>
                    <p className="text-gray-600"><span className="font-medium">Eligibility:</span> {vaccine.eligibility}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50" id="faqs">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about vaccination, registration, and appointments.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button asChild variant="outline" className="border-vaxtrack-500 text-vaxtrack-500 hover:bg-vaxtrack-50">
              <a href="#contact">Contact Support</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white" id="contact">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-gray-600 mb-6">
                  Have questions or need assistance with vaccination registration? Our support team is here to help you.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-vaxtrack-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600">+91 1234 567 890</p>
                      <p className="text-gray-600">Toll Free: 1800 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-vaxtrack-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">support@vaxtrack.com</p>
                      <p className="text-gray-600">info@vaxtrack.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-vaxtrack-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-gray-600">VaxTrack Headquarters</p>
                      <p className="text-gray-600">123 Vaccination Street, Health District</p>
                      <p className="text-gray-600">New Delhi, 110001, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-vaxtrack-500 focus:border-vaxtrack-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-vaxtrack-500 focus:border-vaxtrack-500"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-vaxtrack-500 focus:border-vaxtrack-500"
                      placeholder="Message subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-vaxtrack-500 focus:border-vaxtrack-500"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-vaxtrack-500 hover:bg-vaxtrack-600">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
