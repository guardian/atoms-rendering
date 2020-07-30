import React from 'react';

import { QandaAtom } from './QandaAtom';

const title =
    'How can I protect myself and others from the coronavirus outbreak?';
const html =
    '<p>The World Health Organization is recommending that people take simple precautions to reduce exposure to and transmission of the coronavirus, for which there is no specific cure or vaccine.</p> <p>The UN agency&nbsp;<a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">advises</a>&nbsp;people to:</p> <ul> <li>Frequently wash their hands with an alcohol-based hand rub or warm water and soap</li> <li>Cover their mouth and nose with a flexed elbow or tissue when sneezing or coughing</li> <li>Avoid close contact with anyone who has a fever or cough</li> <li>Seek early medical help if they have a fever, cough and difficulty breathing, and share their travel history with healthcare providers</li> <li>Advice about face masks varies. Wearing them while out and about may offer some protection against both spreading and catching the virus via coughs and sneezes, but it is not a cast-iron guarantee of protection</li> </ul> <p>Many countries are now enforcing or recommending curfews or lockdowns. <b>Check with your local authorities for up-to-date information about the situation in your area.</b>&nbsp;</p> <p>In the UK, NHS advice is that anyone with symptoms should&nbsp;<b>stay at home for at least 7 days</b>.</p> <p>If you live with other people,&nbsp;<b>they should stay at home for at least 14 days</b>, to avoid spreading the infection outside the home.</p>';

const id = '7a6078f6-5a66-4d3e-9339-5610fe320767';

export default {
    title: 'QandaAtom',
    component: QandaAtom,
};

export const ListStory = (): JSX.Element => {
    return (
        <QandaAtom
            id={id}
            title={title}
            html={html}
            likeHandler={() => {
                return null;
            }}
            dislikeHandler={() => {
                return null;
            }}
            expandHandler={() => {
                return null;
            }}
        ></QandaAtom>
    );
};

const title2 = 'Coronavirus: should everyone be wearing face masks?';

const id2 = '77142d5a-0bf3-4a80-b538-c47a11b57f6a';

const html2 =
    '<p>Some countries and states have been recommending that everybody wears face masks in indoor settings where social distancing is difficult or impossible. They have been made mandatory on public transport or in shops in many countries.</p><p>According to guidance from the World Health Organization, people over 60 or with health issues should wear a medical-grade mask when they are out and cannot socially distance, while all others should wear a three-layer fabric mask.</p><p>The WHO guidance, announced on 5 June, is a result of research commissioned by the organisation. It is still unknown whether the wearers of masks are protected, say its experts, but the new design it advocates does give protection to other people if properly used.</p><p>The WHO says masks should be made of three layers – with cotton closest to the face, followed by a polypropylene layer and then a synthetic layer that is fluid-resistant. These are no substitute for physical distancing and hand hygiene, it says, but should be worn in situations where distancing is difficult, such as on public transport and at mass demonstrations.</p><p>The WHO has been reluctant to commit to recommending face coverings, firstly because the evidence on whether they offer any protection to the public is limited and – more importantly – because it was afraid it would lead to shortages of medical-grade masks for health workers.</p><p><b>&nbsp;<a href="https://www.theguardian.com/profile/sarahboseley" data-link-name="in body link" class="u-underline">Sarah Boseley</a></b>&nbsp;<i>Health editor</i></p>';

export const AuthorStory = (): JSX.Element => {
    return (
        <QandaAtom
            id={id2}
            title={title2}
            html={html2}
            image={''}
            credit={''}
            likeHandler={() => {
                return null;
            }}
            dislikeHandler={() => {
                return null;
            }}
            expandHandler={() => {
                return null;
            }}
        ></QandaAtom>
    );
};

const imageTitle = 'Coronavirus pandemic: 10 countries of concern';

const imageBodyHtml = `<p><b>Brazil&nbsp;</b>67,964 deaths, 1,713,160 cases</p><p>President Jair Bolsonaro dismissed the disease as a “little flu” as it rampaged through his country and mocked measures&nbsp;such as wearing masks. Two health ministers have quit and Brazil's outbreak is the second-deadliest in the world.<br> </p><p><b>India&nbsp;</b>21,129 deaths, 767,296 cases</p><p>India brought in a strict nationwide lockdown in March that slowed the spread of the virus but did not bring it under control. As the country began easing controls, cases surged and it now has the third highest number. Mortality rates are low, but it is unclear if this reflects reporting problems or a relatively resilient population.</p>
<p><b>Iran&nbsp;</b>250,458 cases, 12,305 deaths</p>
<p>Iran had one of the first major outbreaks outside China. A lockdown slowed its spread but after that was eased in April, cases rebounded. Several senior officials have tested positive, and the government has strengthened controls, including making masks obligatory in public places.</p>
<p><b>Israel&nbsp;</b>33,947 cases, 346 deaths</p>
<p>Israel had an early travel ban and strict lockdowns, and in April the prime minister, Benjamin Netanyahu, declared the country an example to the world in controlling Covid-19. But cases that in May were down to just 20 a day, skyrocketed after the country started opening up. Partial controls have been brought back with warnings more could follow.</p>
<p><b>Mexico&nbsp;</b>275,003 cases, 32,796 deaths</p>
<p>President Andrés Manuel López Obrador joined other populists from across the political spectrum in dismissing the threat from coronavirus; when schools closed in March he shared a video of himself hugging fans and kissing a baby. The outbreak is now one of the worst on the continent.</p>
<p><b>Philippines&nbsp;</b>51,754 cases, 1,314 deaths</p>
<p>A strict lockdown from March to June kept the disease under control but shrank the economy for the first time in 20 years. Cases have climbed steadily since the country started coming out of lockdown, and President Rodrigo Duterte has said the country cannot afford to fully reopen because it would be overwhelmed by another spike.</p>
<p><b>Russia&nbsp;</b>706,179 cases, 10,825 deaths</p>
<p>Coronavirus was slow to arrive in Russia, and travel bans and a lockdown initially slowed its spread, but controls were lifted twice for political reasons – a military parade and a referendum on allowing Putin to stay in power longer. Despite having the fourth biggest outbreak in the world controls are now being eased nationwide.</p>
<p><b>Serbia&nbsp;</b>17,342 cases, 352 deaths</p>
<p>Cases are rising rapidly, hospitals are full and doctors exhausted. But the government has rowed back from plans to bring back lockdown controls, after two days of violent protests. Critics blame the sharp rise in cases on authorities who allowed mass gatherings in May and elections in June. Officials say it is due to a lack of sanitary discipline, especially in nightclubs.</p>
<p><b>South Africa&nbsp;</b>224,664 cases, 3,602 deaths</p>
<p>South Africa has by far the largest outbreak on the African continent, despite one of the strictest lockdowns in the world. Sales of alcohol and cigarettes were even banned. But it began reopening in May, apparently fuelling the recent rise in cases which have more than doubled over the last two weeks.</p>
<p><b>US&nbsp;</b>132,310 deaths, 3,055,491 cases</p>
<p>The US ban on travellers from overseas came too late, and though most states had lockdowns of some form in spring, they varied in length and strictness. Some places that were among the earliest to lift them are now battling fast-rising outbreaks, and the country has the highest number of confirmed cases and deaths. Opposition to lockdowns and mask-wearing remains widespread.</p>
<p>Source: Johns Hopkins CSSE, 9 July</p>`;

const image =
    'https://i.guim.co.uk/img/media/1cd3cc5864d9e6fc0b74134eaff7ab329cb89678/914_0_1757_1757/1757.jpg?width=620&quality=85&auto=format&fit=max&s=c1aadf54045c6a8c11e9c077324e238f';

const credit = 'Photograph: Mark R Cristino/EPA';

export const ImageStory = (): JSX.Element => {
    return (
        <QandaAtom
            id={id2}
            title={imageTitle}
            html={imageBodyHtml}
            image={image}
            credit={credit}
            likeHandler={() => {
                return null;
            }}
            dislikeHandler={() => {
                return null;
            }}
            expandHandler={() => {
                return null;
            }}
        ></QandaAtom>
    );
};
