import React from 'react';
import { Heading,Text } from '../Components/Typography';

const TermsAndConditions = () => {
  const sections = [
    {
      id: 'welcome',
      title: 'Welcome to ShopViaCal',
      content: [
        'This Services Agreement ("Agreement") is a legal agreement between ShopViaCal Inc. ("ShopViaCal", "we", or "us") and the entity or person ("you", "your", or "user") who registered on the ShopViaCal signup page to utilize our personal shopping services, assessment services, and other business solutions that may be offered by ShopViaCal and its affiliated entities (each, a "Service"). This Agreement outlines the terms of service that govern your usage of the Services. If any aspect of this Agreement is unclear to you, please reach out to us before commencing use of the Services.',
        'Access to and/or any Services is contingent upon your acceptance and adherence to all stipulated terms and conditions in this Agreement.'
      ]
    },
    {
      id: 'account',
      title: 'Account Terms',
      content: [
        'In order to access and make use of the Services, you must complete the registration process for an ShopViaCal account ("Account"). Successful completion of your Account registration mandates the provision of your full legal name, a valid email address, and any other information marked as mandatory. ShopViaCal reserves the right to decline your Account application or terminate an existing Account at our sole discretion, without the obligation to provide a rationale.',
        'You must be of legal age (18 years or older) or meet the age of majority in your jurisdiction, whichever is higher, to open an Account and utilize the Services. By accepting services provided by ShopViaCal, you affirm that the purpose is business-related and not intended for personal, household, or familial use.',
        'You acknowledge that the email address you provide upon Account creation, or any subsequent updates, will serve as your primary mode of communication between you and ShopViaCal ("Primary Email Address"). Maintenance of the Primary Email Address is your responsibility, and it must be capable of both sending and receiving messages. Email correspondence from your Primary Email Address will serve as the valid means of authentication.',
        'The security of your password lies with you. ShopViaCal shall not be held liable for any losses or damages arising from your failure to maintain the security of your Account and password.',
        'Technical assistance related to the Services is exclusively available to ShopViaCal Users. Queries regarding the Terms of Service should be directed to ShopViaCal Support.',
        'You agree not to reproduce, duplicate, copy, sell, resell, or exploit any part of the Service, the Services use, or access to the Service without ShopViaCal\'s explicit written consent. This encompasses, but isn\'t limited to: bypass technical intentions of the Services; nor to utilize bots to activate disabled features or functionalities; or engage in data mining, dissembling, or reverse engineering the Services. Accessing the Services or monitoring materials or information using automated means like robots, spiders, or scrapers is prohibited.',
        'You understand that your Materials may be transmitted without encryption and may involve (a) transmission across diverse networks and (b) adjustments to comply with technical requisites of connected networks or devices. "Materials" refer to Your Trademarks, copyrighted content, any products or services offered via the Services, and all images, written content, information, data, graphics, pricing lists, trade names, audio files, code, information, or other data supplied by you or your affiliates to ShopViaCal or its affiliates.'
      ]
    },
    {
      id: 'company',
      title: 'Company Terms',
      content: [
        'To establish a new company through your ShopViaCal account, you must provide: organization location details, a valid email address, and any other mandatory information. ShopViaCal retains the right to reject organization applications or terminate existing organizations at our sole discretion, without the need for explanation.'
      ]
    },
    {
      id: 'activation',
      title: 'Account Activation',
      content: [
        'The individual signing up for the Service by creating an Account will be considered the contracting party ("Company Owner") for the purposes of our Terms of Service and will be authorized to utilize any corresponding Account provided to the Company Owner in connection with the Service. Ensuring the veracity of the Company Owner\'s name (excluding the legal name of the owning company if applicable) detailed on the company\'s website is your responsibility.',
        'If you are registering for the Services on behalf of your employer, your employer shall be deemed the organization Owner. If registering for the Services on behalf of your employer, you must use your employer-issued email address, and you confirm that you possess the authority to bind your employer to our Terms of Service.',
        'An ShopViaCal company can only be affiliated with a single Company Owner. A Company\'s Owner may have multiple ShopViaCal stores. Access to a given company (whether based on ShopViaCal\'s platform or at least one of a website) is provided solely to the Account.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-8">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96  rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96  rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Heading 
            as="h1" 
            size={{ sm: "xl", base: "xl", md: "2xl", lg: "3xl" }} 
            weight="bold" 
            className="mb-4"
          >
            Terms of <span className="">Service</span>
          </Heading>
          <Text size="sm" className="text-gray-400">
            Last Updated: October 19, 2025
          </Text>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-lg py-4">
            <div className="sticky top-24 space-y-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-4 py-2 text-sm text-gray-400 hover:text-primary  rounded-lg transition-all duration-200"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            {sections.map((section) => (
              <section 
                key={section.id} 
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-2xl p-4 md:p-8 border border-white/10 hover:border-primary transition-all duration-300">
                  <Heading 
                    as="h2" 
                    size={{ sm: "lg", base: "lg", md: "2xl" }} 
                    weight="bold" 
                    className="mb-6 text-text-primary"
                  >
                    {section.title}
                  </Heading>
                  
                  <div className="space-y-4">
                    {section.content.map((paragraph, index) => (
                      <Text 
                        key={index}
                        size={{ base: "sm" }}
                        weight='normal'
                        className="text-text-secondary leading-relaxed"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;