import React from 'react';
import Styles from './info.module.css';

export default () => (
  <section id="whattowear" className={Styles.info}>
    <div>
      <h2>What to wear</h2>
      <p>
        Day Guests: Something smart. We’re not talking black tie but you get the
        picture!.
      </p>

      <p>Evening Guests: Smart-casual will be fine</p>

      <h2>Gifts</h2>
      <p>We don’t expect you to get us a gift.</p>
      <p>If you do wish to get us something though, we’d prefer cash please.</p>
      <p>
        You might know, we’re hopefully moving to Seattle next year (subject to
        visas) and we don’t plan on taking much with us.
      </p>
      <p>
        We’ll put the cash towards a honeymoon or for buying all the new stuff
        we’ll need when we get to Seattle.
      </p>
    </div>
  </section>
);
