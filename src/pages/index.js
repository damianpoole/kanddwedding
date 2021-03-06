import React, { useEffect, useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Header from '../components/Header';
import Hero from '../components/Hero';
import GettingThere from '../components/GettingThere';
import DayPlan from '../components/DayPlan';
import Accomadation from '../components/Accomadation';
import RSVP from '../components/Rsvp';
import Info from '../components/Info';
import * as qs from 'query-string';

import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  const [guest, setGuest] = useState();

  useEffect(() => {
    const { g } = qs.parse(window.location.search);
    const guest = data.allGuestsJson.nodes.filter(x => x.id === g)[0];
    setGuest(guest);
  });

  return (
    <Layout>
      <SEO title="Home" />
      <Header haveGuest={!!guest} />
      <Hero />
      <GettingThere />
      {guest && <DayPlan guest={guest} />}
      <Accomadation />
      <Info />
      <RSVP guest={guest} />
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allGuestsJson {
      nodes {
        type
        id
        guests {
          name
        }
        family
      }
    }
  }
`;

export default IndexPage;
