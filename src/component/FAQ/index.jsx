import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import { LogoColor } from '../../common/material-ui-component/svg-icon';
import MyButton from '../../common/material-ui-component/button';
import ColorContainer from '../../common/box-container/color-container';
import faqStyle from './style';
import FAQBg from '../../assets/images/FAQ-bg.jpg';

const useStyles = makeStyles(faqStyle);

const FAQIndex = () => {
  const classes = useStyles();
  return (
    <ColorContainer
      imgUrl={FAQBg}
      floatingLayer={<span className={classes.faqText}>FAQ</span>}
    >
      <>
        <div className={classes.logoWrapper}>
          <LogoColor className={classes.logo} />
        </div>
        <div className={classes.textList}>
          <h5>
            Influmonster is an online streetwear
            marketplace providing consumers with
            unique product offerings that are
            dedicated to individuality, diversity,
            positivity and empowerment.
          </h5>
          <h5>
            When you shop brands on Influmonster,
            you&apos;re not only supporting brands
            who align with the values and
            ideals, you&apos;re supporting
            the messages and communities behind it.
          </h5>
          <p className={classes.marginBom8}>
            Each brand on the platform has been
            hand selected to participate in the
            Influmonster Tribe affiliate program
            to help celebrate what makes every
            individual unique; personal style.
            If you’re ready to earn and support
            diverse brands, join today!
          </p>
          <h4>What is the Influmonster Tribe Affiliate Program?</h4>
          <p className={classes.marginBom5}>
            The Influmonster Affiliate Program (IMTRIBE)
            is an affiliate program that rewards influencers, creators and
            key opinion leaders for supporting Influmonster
            by encouraging their fans and community to shop our unique,
            value driven streetwear products.
          </p>
          <p className={classes.marginBom8}>
            Our trendy items paired with our CPSA model
            and competitive commission rates, make this program ideal for
            anyone who loves staying on trend and promoting
            some of the best streetwear brands with a cause.
          </p>
          <h4>Why Join the IMTRIBE?</h4>
          <p className={classes.marginBom8}>
            There are so many reasons to join our tribe,
            but here are a few points, just in case you need to be swayed;
            <br />
            - Easy and free to sign up - Competitive commission rates
            <br />
            - up to 10% on apparel! - 30 day cookie duration?
            <br />
            - Exclusive IMTRIBE giveaways - Referral bonuses
            <br />
            - Growing catalog to compliment every style
            <br />
            - Quality, on-trend hand selected products
          </p>
          <h4>How Does IMTRIBE Work?</h4>
          <p className={classes.marginBom5}>
            Becoming an IMTRIBE member means you will earn
            commissions on sales made through your affiliate link when
            you promote Influmonster and the Influmonster network merchants.
          </p>
          <p className={classes.marginBom8}>
            By posting customized links to your blog and social
            media sites, you are able to earn a commission when your
            friends, family or followers shop the best streetwear products using your link.
          </p>
          <h4>To start earning, simply:</h4>
          <p className={classes.marginBom5}>
            <b>1. Go to your dashboard</b>
            <br />
            <b>2. Select the product you’d like to promote</b>
            <br />
            <b>3. Generate a link with your affiliate code</b>
            <br />
            <b>4. Copy link</b>
            <br />
            <b>5. Insert in a blog post, external site, Instagram or any other social media site</b>
            <br />
            <b>6. Wallah! You’re ready to start earning!!</b>
          </p>
          <p className={classes.marginBom8}>
            Once a purchase has been made and confirmed with
            your link, you earn up to 10% in commission depending on
            the category (home, apparel, lifestyle, etc.
          </p>
          <h4>What are the requirements to join?</h4>
          <p className={classes.marginBom8}>
            To join this exclusive streetwear community, you
            must have a social media presence and/or a blog or website.
          </p>
          <h4>When does IMTRIBE Pay?</h4>
          <p className={classes.marginBom8}>
            Commission payments are done once a month via
            direct deposit. You must meet a $50 minimum in order to cash
            out.
          </p>
          <h4>What is the cookie duration for IMTRIBE?</h4>
          <p className={classes.marginBom8}>
            To help affiliates earn as much as possible, cookie
            duration is typically 30 calendar days.
          </p>
          <h4>
            What types of products are on our affiliate network?
          </h4>
          <p className={classes.marginBom8}>
            At Influmonster we believe in individuality and freedom
            of expression, therefore you will find products that
            express your individualism in all aspects of life. Within
            the network you will find chic, trendy streetwear
            and athleisure apparel that perfectly compliments any style.
          </p>
          <h4>Additional info:</h4>
          <p className={classes.marginBom8}>
            To remain part of the program, you must make at least one sale within a 90 day period.
          </p>
          <h5>
            IM, short for Influmonster, stands for “I’m”, as in I am
            who I am. So what are you waiting for? Own your
            individuality and sign up to join our tribe of dreamers, doers and streetwear gurus!
          </h5>
        </div>
        <div className={classes.btnWrapper}>
          <MyButton
            variant="contained"
            color="secondary"
            className={classes.btn}
            component={RouterLink}
            to="/s/signup"
          >
            JOIN NOW
          </MyButton>
        </div>
      </>
    </ColorContainer>
  );
};

export default FAQIndex;
