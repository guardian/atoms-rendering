import React from 'react';

import { QandaAtom } from './QandaAtom';

const title =
    'How can I protect myself and others from the coronavirus outbreak?';
const html =
    '<p></p> <p>The World Health Organization is recommending that people take simple precautions to reduce exposure to and transmission of the coronavirus, for which there is no specific cure or vaccine.</p> <p>The UN agency&nbsp;<a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">advises</a>&nbsp;people to:</p> <ul> <li>Frequently wash their hands with an alcohol-based hand rub or warm water and soap</li> <li>Cover their mouth and nose with a flexed elbow or tissue when sneezing or coughing</li> <li>Avoid close contact with anyone who has a fever or cough</li> <li>Seek early medical help if they have a fever, cough and difficulty breathing, and share their travel history with healthcare providers</li> <li>Advice about face masks varies. Wearing them while out and about may offer some protection against both spreading and catching the virus via coughs and sneezes, but it is not a cast-iron guarantee of protection</li> </ul> <p>Many countries are now enforcing or recommending curfews or lockdowns. <b>Check with your local authorities for up-to-date information about the situation in your area.</b>&nbsp;</p> <p>In the UK, NHS advice is that anyone with symptoms should&nbsp;<b>stay at home for at least 7 days</b>.</p> <p>If you live with other people,&nbsp;<b>they should stay at home for at least 14 days</b>, to avoid spreading the infection outside the home.</p> <p></p> ';

const id = '7a6078f6-5a66-4d3e-9339-5610fe320767';

export default {
    title: 'QandaAtom',
    component: QandaAtom,
};

export const DefaultStory = (): JSX.Element => {
    //return <QandaAtom id="abc123" />;
    return <QandaAtom id={id} title={title} html={html}></QandaAtom>;
};
