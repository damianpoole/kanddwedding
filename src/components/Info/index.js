import React from 'react';
import Styles from './info.module.css';

export default () => (
  <section className={Styles.info}>
    <div>
      <div>
        <h3>What to wear</h3>
        <p>
          Day Guests: Please wear something smart. We’re not talking black tie
          but also not jeans etc. something in between.
        </p>

        <p>Evening Guests: Smart-casual will be fine</p>
      </div>
      <div>
        <h3>Gifts</h3>
        <p>We don’t expect you to get us a gift.</p>
        <p>If you do wish to get us something we’d prefer cash please.</p>
        <p>
          You might know, we’re hopefully moving to Seattle next year (subject
          to visas) and we don’t plan on taking much with us.
        </p>
        <p>
          We’ll put the cash towards a honeymoon or for buying all the new stuff
          we’ll need when we get to Seattle.
        </p>
      </div>
    </div>
  </section>
);
