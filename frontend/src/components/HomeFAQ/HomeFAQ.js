import React from "react";
import Container from "react-bootstrap/Container";
import "./HomeFAQ.scss";
import { Collapse } from "antd";

const HomeFAQ = () => {
  const faq1 = [
    {
      header: "I just want to check schedules, not book. How should I proceed?",
      answer: `You can easily check schedules without actually making a booking.
        Once you've registered online for a free account.`,
    },
    {
      header: "Can I authorise my suppliers to place bookings on my behalf?",
      answer: `If you would like your supplier to make bookings as soon as the
        cargo is ready to be shipped, you can easily authorise your
        supplier to place bookings on your behalf.`,
    },
    {
      header: "Can my buyers and suppliers also track the cargo?",
      answer: `Both buyers and suppliers can track a shipment by clicking on it
        in the platform's Shipments tab.`,
    },
    {
      header: "How can I track my shipments and cargo with Magic Post?",
      answer: `You have complete logistics visibility with a multi-enterprise
        network connecting all stakeholders and displaying the status of
        your supply chain from end to end.`,
    },
  ];
  const faq2 = [
    {
      header:
        "Why can't Transportation deliver my package as soon as it arrives at Central Receiving?",
      answer: `Packages must be officially received, sorted, and labeled before they can be 
      distributed for delivery. Most premium (next day air) packages are processed and 
      delivered the same day, while other material is delivered within 24 hours.`,
    },
    {
      header:
        "Why does Transportation pickup some of my salvage equipment, chairs and tables, for free and other times not?",
      answer: `Individual material/equipment >250 lbs may require assistance from the Riggers.
       Free pickups are only for salvage items < 250 lb. Please note that items must be 
       detached and freestanding in order to be moved free of charge. Drivers do not 
       disconnect or unbolt items to be moved.`,
    },
    {
      header: "When can I get my package delivered?",
      answer: `All research begins with the information given by the requester about their 
      shipment to determine if the package has been received and where it is in the 
      Receiving/ Transportation process. Most packages and material are delivered within 
      one business day.`,
    },
  ];
  return (
    <Container className="home-faq">
      <header>
        <h1>Frequently asked questions</h1>
        <p>
          Take a look at our FAQs for 24/7 help on your own time. And if you
          can't find the answer you're looking for, you can always reach out to
          our global network of logistics experts via online chat or your local
          office.
        </p>
      </header>
      <div className="faqs">
        <Collapse className="faq">
          {faq1.map((question, index) => {
            return (
              <Collapse.Panel header={question.header} key={index}>
                <p>{question.answer}</p>
              </Collapse.Panel>
            );
          })}
        </Collapse>
        <Collapse className="faq">
          {faq2.map((question, index) => {
            return (
              <Collapse.Panel header={question.header} key={index}>
                <p>{question.answer}</p>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </div>
    </Container>
  );
};

export default HomeFAQ;
