import React from 'react';

import { GuideAtom } from './GuideAtom';

export default {
    title: 'GuideAtom',
    component: GuideAtom,
};

export const DefaultStory = (): JSX.Element => {
    // Modelled after: https://www.theguardian.com/sport/2020/may/19/pinatubo-has-probably-trained-on-for-the-2000-guineas-says-charlie-appleby
    return (
        <GuideAtom
            id="a76d998e-d4b0-4d00-8afb-773eddb4064c"
            label="Quick Guide"
            title="Wednesday's Hong Kong tips"
            html="<p><b>Happy Valley&nbsp;</b></p><p><b>11.45</b> Happy Good Guys <b>12.15</b> Salto Olimpico <b>12.45</b> Seize The Spirit <b>1.15</b> Allied Agility <b>1.45 </b>Hero Time <b>2.15</b> Simply Fluke <b>2.45</b> Brave King <b>3.15</b> Golden Dash <b>3.50</b> This Is Class</p>"
            credit=""
            pillar="sport"
            likeHandler={() => {
                console.log('LIKED');
                return null;
            }}
            dislikeHandler={() => {
                console.log('DISLIKED');
                return null;
            }}
            expandCallback={() => {
                console.log('EXPANDED');
                return null;
            }}
        />
    );
};

export const ListStory = (): JSX.Element => {
    //Modelled after: https://www.theguardian.com/business/2020/jan/27/global-markets-slide-on-back-of-coronavirus-concerns-in-china-stocks
    return (
        <GuideAtom
            id="0a09a661-0ee2-41ea-b0a0-9e1deefd9268"
            label="Quick Guide"
            title="What are coronavirus symptoms and should I go to a doctor?"
            html="<p>Covid-19 is caused by a member of the coronavirus family that has never been encountered before. Like other coronaviruses, it has come from animals. The World Health Organization (WHO) has declared it a pandemic.</p><p>According to the WHO, the most common symptoms of Covid-19 are fever, tiredness and a dry cough. Some patients may also have a runny nose, sore throat, nasal congestion and aches and pains or diarrhoea. Some people report losing their sense of taste and/or smell. About 80% of people who get Covid-19 experience a mild case – about as serious as a regular cold – and recover without needing any special treatment.</p><p>About one in six people, the WHO says, become seriously ill. The elderly and people with underlying medical problems like high blood pressure, heart problems or diabetes, or chronic respiratory conditions, are at a greater risk of serious illness from Covid-19.</p><p>In the UK, the National health Service (NHS) has identified the specific symptoms to look for as experiencing either:</p><ul><li>a high temperature - you feel hot to touch on your chest or back</li><li>a new continuous cough - this means you’ve started coughing repeatedly</li></ul><p>As this is viral pneumonia, antibiotics are of no use. The antiviral drugs we have against flu will not work, and there is currently no vaccine. Recovery depends on the strength of the immune system.</p><p>Medical advice varies around the world - with many countries imposing travel bans and lockdowns to try and prevent the spread of the virus. In many place people are being told to stay at home rather than visit a doctor of hospital in person. Check with your local authorities.</p><p>In the UK, NHS advice is that anyone with symptoms should<b> stay at home for at least 7 days</b>. If you live with other people, <b>they should stay at home for at least 14 days</b>, to avoid spreading the infection outside the home.</p>"
            credit=""
            pillar=""
            likeHandler={() => {
                return null;
            }}
            dislikeHandler={() => {
                return null;
            }}
            expandCallback={() => {
                return null;
            }}
        />
    );
};

export const OrderedListStory = (): JSX.Element => {
    //Modelled after: https://www.theguardian.com/environment/2020/aug/01/plan-to-curb-englands-most-polluted-spot-divides-residents
    return (
        <GuideAtom
            id="b4c77875-8ba3-40d0-926b-0cd7956eed8a"
            label="Quick Guide"
            title="The locations in England with the highest annual average levels of NO2"
            html="<ol><li>Chideock Hill, West Dorset 97.7</li><li>Station Taxi Rank, Sheffield 91.7</li><li>North Street Clock Tower, Brighton 90.8</li><li>Neville Street Tunnel, Leeds 88</li><li>Strand, City of Westminster 88</li><li>Walbrook Wharf, City of London 87</li><li>Hickleton opp Fir Tree Close, Doncaster 86</li><li>Marylebone Road, City of Westminster 85</li><li>Euston Road, London Borough of Camden 82.3</li><li>Hickleton, John O’Gaunts, Doncaster 82</li></ol><p>&nbsp;Latest data is from 2018.&nbsp; The Annual Air Quality Objective is set at 40ug/m3. Source: Friends of the Earth&nbsp;<br></p>"
            credit=""
            pillar=""
            likeHandler={() => {
                return null;
            }}
            dislikeHandler={() => {
                return null;
            }}
            expandCallback={() => {
                return null;
            }}
        />
    );
};

export const ImageStory = (): JSX.Element => {
    //Modelled after: https://www.theguardian.com/politics/2019/jul/06/tory-member-questions-boris-johnsons-ability-to-represent-minorities
    return (
        <GuideAtom
            id="249abe8e-134a-45e3-afcf-b45a665c9a93"
            label="Quick Guide"
            title="Tory party leadership contest"
            html="<p>As she <a href='https://www.theguardian.com/politics/video/2019/may/24/prime-minister-theresa-mays-resignation-speech-in-full-video'>announced on 24 May</a>, Theresa May stepped down formally as Conservative leader on Friday 7 June, although she remains in place as prime minister until her successor is chosen.</p><p>In a Conservative leadership contest MPs hold a series of votes, in order to narrow down the initially crowded field to two leadership hopefuls, who go to a postal ballot of members.<br></p><p><b>How does the voting work?</b></p><p>MPs choose one candidate, in a secret ballot held in a committee room in the House of Commons. The votes are tallied and the results announced on the same day.</p><p>In the first round any candidate who won the support of less than 17 MPs was eliminated. In the second round anybody reaching less than 33 votes was eliminated. In subsequent rounds the bottom placed contender drops out until there are only two left. The party membership then chooses between them.</p><p><b>When will the results be announced?</b><br></p><p>The postal ballot of members has begun, and the Tory party says it will announce the new prime minister on 23 July..</p>"
            credit="Photograph: Neil Hall/EPA"
            image="https://i.guim.co.uk/img/media/d032f9d883807ea5003356289b7a1e9783cc67e5/0_37_4131_2480/4131.jpg?width=620&quality=85&auto=format&fit=max&s=53971cc47cb7c125202b7a647e82a44d"
            pillar="culture"
            likeHandler={() => {
                return null;
            }}
            dislikeHandler={() => {
                return null;
            }}
            expandCallback={() => {
                return null;
            }}
        />
    );
};
