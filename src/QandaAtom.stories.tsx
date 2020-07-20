import React from 'react';

import { QandaAtom } from './QandaAtom';

const title =
    'How can I protect myself and others from the coronavirus outbreak?';
const html =
    '<p></p> <p>The World Health Organization is recommending that people take simple precautions to reduce exposure to and transmission of the coronavirus, for which there is no specific cure or vaccine.</p> <p>The UN agency&nbsp;<a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">advises</a>&nbsp;people to:</p> <ul> <li>Frequently wash their hands with an alcohol-based hand rub or warm water and soap</li> <li>Cover their mouth and nose with a flexed elbow or tissue when sneezing or coughing</li> <li>Avoid close contact with anyone who has a fever or cough</li> <li>Seek early medical help if they have a fever, cough and difficulty breathing, and share their travel history with healthcare providers</li> <li>Advice about face masks varies. Wearing them while out and about may offer some protection against both spreading and catching the virus via coughs and sneezes, but it is not a cast-iron guarantee of protection</li> </ul> <p>Many countries are now enforcing or recommending curfews or lockdowns. <b>Check with your local authorities for up-to-date information about the situation in your area.</b>&nbsp;</p> <p>In the UK, NHS advice is that anyone with symptoms should&nbsp;<b>stay at home for at least 7 days</b>.</p> <p>If you live with other people,&nbsp;<b>they should stay at home for at least 14 days</b>, to avoid spreading the infection outside the home.</p> <p></p> ';

const id = '7a6078f6-5a66-4d3e-9339-5610fe320767';

/* const topPaddingText =
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacinia, neque sit amet faucibus pretium, mi lorem laoreet nibh, quis lobortis nisl libero ac dolor. Quisque ut dignissim odio. Mauris velit augue, semper ut dignissim vitae, ullamcorper vitae nulla. Morbi ut dignissim purus, in rutrum dolor. Aenean eu interdum arcu. Cras varius rutrum augue sed semper. Vestibulum ac nisi metus. Sed vitae sapien volutpat est sagittis semper eu eu tortor. Quisque egestas suscipit egestas. Fusce mollis nec lectus ac pulvinar. Donec porta sem ut nunc posuere pretium. Donec quam tortor, euismod eu suscipit a, ullamcorper at neque. Integer vel condimentum libero. Etiam orci massa, pulvinar non tristique id, molestie vulputate est. Proin viverra fringilla est eget vestibulum.</p>';

const bottomPaddingText =
    '<p>Aenean at molestie nulla. Duis consectetur euismod arcu, quis luctus sem rutrum nec. Vestibulum fringilla, purus ac ultrices laoreet, lorem purus bibendum dolor, et pellentesque libero velit nec lorem. Sed quam tellus, tincidunt eu placerat vitae, tincidunt sit amet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam erat risus, id tempor nulla consectetur cursus. Nulla sit amet urna laoreet urna consequat cursus eget quis velit. Integer varius non lectus eu commodo. </p>';
*/

export default {
    title: 'QandaAtom',
    component: QandaAtom,
};

export const LinkStory = (): JSX.Element => {
    return <QandaAtom id={id} title={title} html={html}></QandaAtom>;
};

const title2 = 'Coronavirus: should everyone be wearing face masks?';

const id2 = '77142d5a-0bf3-4a80-b538-c47a11b57f6a';

const html2 =
    '<p>Some countries and states have been recommending that everybody wears face masks in indoor settings where social distancing is difficult or impossible. They have been made mandatory on public transport or in shops in many countries.</p><p>According to guidance from the World Health Organization, people over 60 or with health issues should wear a medical-grade mask when they are out and cannot socially distance, while all others should wear a three-layer fabric mask.</p><p>The WHO guidance, announced on 5 June, is a result of research commissioned by the organisation. It is still unknown whether the wearers of masks are protected, say its experts, but the new design it advocates does give protection to other people if properly used.</p><p>The WHO says masks should be made of three layers – with cotton closest to the face, followed by a polypropylene layer and then a synthetic layer that is fluid-resistant. These are no substitute for physical distancing and hand hygiene, it says, but should be worn in situations where distancing is difficult, such as on public transport and at mass demonstrations.</p><p>The WHO has been reluctant to commit to recommending face coverings, firstly because the evidence on whether they offer any protection to the public is limited and – more importantly – because it was afraid it would lead to shortages of medical-grade masks for health workers.</p><p><b>&nbsp;<a href="https://www.theguardian.com/profile/sarahboseley" data-link-name="in body link" class="u-underline">Sarah Boseley</a></b>&nbsp;<i>Health editor</i></p>';

export const AuthorStory = (): JSX.Element => {
    return <QandaAtom id={id2} title={title2} html={html2}></QandaAtom>;
};
