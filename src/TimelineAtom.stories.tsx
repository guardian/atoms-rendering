import React from 'react';

import { TimelineAtom } from './TimelineAtom';

export default {
    title: 'TimelineAtom',
    component: TimelineAtom,
};

// Based on https://www.theguardian.com/stage/2018/mar/06/hamilton-nominated-olivier-awards
export const NoEventsStoryExpanded = (): JSX.Element => {
    return (
        <TimelineAtom
            id="9704dbd0-0273-49d2-8425-c58ccf9a1951"
            description='<p><b>January 2015</b></p><p>Hamilton, a new musical written by and starring <a href="https://www.theguardian.com/stage/2016/sep/25/lin-manuel-miranda-broadway-smash-hamilton-hip-hop-musical-school-of-eminem">Lin-Manuel Miranda</a>, has its first performances off-Broadway at the Public theater in New York. Its subject is the US founding father who was the first secretary of the Treasury.&nbsp;</p><p><b>February 2015</b><br></p><p>As the show opens officially, it wins praise from critics, particularly for its innovative blend of musical styles, from rap to operetta. In her <a href="https://www.theguardian.com/stage/2015/feb/18/hamilton-review-founding-father-gets-a-hip-hop-makeover">four-star review</a>, the Guardian’s Alexis Soloski calls the show "brash, nimble, historically engaged and startlingly contemporary".</p><p><b>August 2015</b><br></p><p>After selling out its run at the Public, the show opens on Broadway at the Richard Rodgers theatre and there is huge demand for tickets.</p><p><b>February 2016</b><br></p><p>The original Broadway cast recording wins a Grammy award for best musical theatre album.</p><p><b>March 2016</b><br></p><p>Miranda visits the White House to perform songs from the musical and a <a href="https://www.theguardian.com/stage/video/2016/mar/15/hamilton-star-freestyle-raps-with-obama-at-the-white-house-video">video of him freestyling</a> in the Rose Garden with President Barack Obama goes viral. First lady Michelle Obama calls the show “the best piece of art in any form that I have ever seen in my life”.</p><p><b>April 2016</b><br></p><p>Hamilton wins the Pulitzer prize for drama.</p><p><b>June 2016</b>&nbsp;<br></p><p>The musical breaks records, winning 11 Tony awards – at a ceremony that takes place after news breaks of a mass shooting in Orlando, Florida. Miranda performs a sonnet in praise of his wife and son, ending with the words: “Now fill the world with music, love and pride.”</p><p><b>July 2016</b><br></p><p>Miranda stops performing in the show to pursue other opportunities, including starring in a sequel to Mary Poppins. A spoof version of the musical, Spamilton, opens in New York.</p><p><b>&nbsp;October 2016</b></p><p>A production of Hamilton opens in Chicago and runs concurrently with the Broadway version.</p><p><b>November 2016</b><br></p><p>Vice-president-elect <a href="https://www.theguardian.com/us-news/video/2016/nov/19/mike-pence-told-at-hamilton-we-are-anxious-you-will-not-protect-us-video">Mike Pence</a> sees the show in New York. From the stage, actor Brandon Victor Dixon addresses him directly, saying: “We are the diverse America who are alarmed and anxious that your new administration will not protect us.” On Twitter, Donald Trump condemns their “terrible behaviour” and says he hears the show is “highly overrated”.<br></p><p><b>January 2017</b><br></p><p>The first cast members are revealed for a West End production of Hamilton.&nbsp;</p><p><b>December 2017</b><br></p><p>The show opens to five-star reviews at the newly renovated Victoria Palace theatre in London.</p><p><b>March 2018</b></p><p>The London production of Hamilton gets 13 Olivier nominations, making it the most nominated show in the history of the awards.</p><p><b>July 2020</b></p><p>A filmed version of the Broadway production debuts on the Disney+ streaming service, warmly welcomed while the world is still in lockdown over the coronavirus crisis.&nbsp;</p>'
            title="How Hamilton the Musical became a smash hit"
            pillar="culture"
            expandForStorybook={true}
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

// Based on https://www.theguardian.com/uk-news/2020/jul/21/importance-of-prince-andrew-interview-became-clear-in-editing-suite-says-maitlis
export const NewsStoryNoDescriptionExpanded = (): JSX.Element => {
    return (
        <TimelineAtom
            id="a10c1968-908d-4ec5-86ef-05b45468c0de"
            title="Jeffrey Epstein, Ghislaine Maxwell and Prince Andrew"
            pillar="news"
            events={NewsEvents}
            expandForStorybook={true}
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

export const SportStoryWithDescriptionAndEventsExpanded = (): JSX.Element => {
    return (
        <TimelineAtom
            id="15418150-6d0c-4bd1-86a2-be894e5fe928"
            title="Froome's golden decade with Team Sky"
            pillar="sport"
            description="<p><i>Chris Froome has won seven Grand Tours since joining Team Sky in 2010</i></p>"
            events={SportEvents}
            expandForStorybook={true}
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

const NewsEvents = [
    {
        title: '',
        date: '1999',
        body:
            '<p>In the early 90s, <b>Ghislaine Maxwell</b>, the daughter of British media tycoon Robert Maxwell, met investment banker and financier <b>Jeffrey Epstein</b>. Their relationship was initially romantic, but it evolved into something more akin to that of Maxwell being a close friend, confidante and personal assistant.&nbsp;</p><p>The Duke of York, <b>Prince Andrew</b>, was reportedly introduced to Epstein through their mutual friend Maxwell in 1999, and Epstein reportedly visited <b>the Queen</b>’s private retreat\nin Aberdeenshire.</p><p>Some have suggested the introduction was made earlier. A 2011&nbsp;<a href="https://www.itv.com/news/2019-11-20/prince-andrew-and-jeffrey-epstein-met-in-early-1990s-not-1999-as-claimed-in-interview/">letter to the Times of London</a>&nbsp;from the prince’s then private secretary, Alastair Watson, suggests Andrew and Epstein knew each other from the early 90s.</p>',
    },
    {
        title: '',
        date: '2000',
        body:
            '<p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAndrew, Maxwell and Epstein are seen together at <b>Donald\nTrump</b>’s Mar-a-Lago club in Florida. Later that year, Epstein and Maxwell\nattend a joint birthday party at Windsor Castle hosted by the Queen.</p>',
    },
    {
        title: '',
        date: '2001',
        body:
            '<p>Andrew and Epstein holiday together and are pictured on a yacht in Phuket, Thailand,&nbsp;<a href="https://www.thetimes.co.uk/article/andrew-relaxes-on-epsteins-yacht-after-hard-year-on-holiday-5qjz0nh0rkz">surrounded by topless women</a>. The Times of London reported the prince’s holiday was paid for by Epstein.</p><p>In the same year, <b>Virginia Giuffre</b>, then 17, claims to have had sex\nwith Andrew in Maxwell’s home in Belgravia, London. Giuffre, whose surname was \nRoberts at the time of the alleged incidents, says she slept with Andrew\n twice more, at Epstein’s\nNew York home and at an “orgy” on his private island in the Caribbean.</p>',
    },
    {
        title: '',
        date: '2008',
        body:
            '<p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nEpstein is jailed for 18 months by a Florida&nbsp;state court after pleading guilty to\nprostituting minors.</p>',
    },
    {
        title: '',
        date: '2010',
        body:
            '<p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSoon after his release, Epstein is visited by\nAndrew in New York. The pair are photographed together in Central Park. Footage\nemerges years later, reportedly shot on 6 December, that appears to show Andrew\ninside Epstein’s Manhattan mansion waving goodbye to a woman from behind a door.</p>',
    },
    {
        title: '',
        date: '2011',
        body:
            '<p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAndrew quits his role as UK trade envoy following a\nfurore over the Central Park photos.</p>',
    },
    {
        title: '',
        date: '2015',
        body:
            '<p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAllegations that Andrew had sex with Giuffre emerge\nin court documents in Florida related to Epstein. The papers say she was forced to have sex with Andrew when she was 17, which is under the\nage of consent under Florida law. Buckingham Palace denies the allegations. The claims against Andrew are later struck from US civil\ncourt records following a federal judge’s ruling.</p>',
    },
    {
        title: '',
        date: '2019',
        body:
            "<p>Andrew is accused of sexual\nimpropriety by a second alleged Epstein victim, <b>Johanna Sjoberg</b>. She claims he\ntouched her breast at the billionaire’s Manhattan apartment in 2001.\nBuckingham Palace says the allegations are 'categorically untrue'.</p>",
    },
    {
        title: ' ',
        date: '10 August 2019',
        body:
            '<p>Epstein is found dead in his jail cell after being re-arrested and charged with sex trafficking. <a href="https://www.theguardian.com/us-news/2019/aug/16/jeffrey-epstein-cause-of-death-coroner-report">A medical examiner says the death was a suicide</a>.</p><p>A pilot on Epstein’s private jet later that month claims Andrew was a passenger on past flights with the financier and Giuffre.</p>',
    },
    {
        title: ' ',
        date: 'November 2019',
        body:
            '<p>Andrew takes part in a disastrous BBC TV interview during which he claims he could not have had&nbsp;<a href="https://www.theguardian.com/uk-news/2019/sep/20/prince-andrew-abuser-claims-virginia-giuffre-tv-interview">sex with Giuffre</a>&nbsp;because he was at home after&nbsp;<a href="https://www.theguardian.com/uk-news/2019/nov/17/wokings-pizza-express-customers-struggle-to-remember-first-visit">a visit to Pizza Express in Woking</a>, and that her description of his dancing with her beforehand could not be true because he was unable to sweat, and that he had "no recollection of ever meeting this lady". After several days of negative reaction, Andrew announces he is to step back from public duties \'for the foreseeable future\'.</p>',
    },
    {
        title: ' ',
        date: '27 January 2020',
        body:
            "<p>US prosecutor <b>Geoffrey Berman</b> gives a public statement suggesting there has been 'zero cooperation' with the investigation from Andrew.</p>",
    },
    {
        title: ' ',
        date: '8 June 2020',
        body:
            "<p>After Berman again claims the prince has 'completely shut the door' on cooperating with the US investigation in March, lawyers for Andrew insist he has repeatedly offered to cooperate and accuse US prosecutors of misleading the public and breaching confidentiality.</p>",
    },
    {
        title: ' ',
        date: 'July 2020',
        body:
            '<p>Maxwell, who has seldom been seen in public in recent years, is <a href="https://www.theguardian.com/us-news/2020/jul/02/ghislaine-maxwell-arrest-jeffrey-epstein-charges-latest-fbi">arrested by the FBI</a>&nbsp;on charges related to Epstein. Unsealed testimony from a 2015 civil case reveal a series of claims about her role in Epstein sex-trafficking ring, including allegations that she <a href="https://www.theguardian.com/us-news/2020/jul/31/ghislaine-maxwell-underage-girls-sex-jeffrey-epstein">trained underage girls as sex slaves</a>.</p>',
    },
];

const SportEvents = [
    {
        title: ' First Grand Tour win',
        date: 'September 2011',
        body:
            '<p>Froome outshines his team leader, Bradley Wiggins, to finish second at the 2011 Vuelta. He is later upgraded to first place after the original winner, Juan José Cobo, was disqualified for drug offences</p>',
    },
    {
        title: ' Tour de France breakthrough',
        date: 'July 2013',
        body:
            '<p>Froome came second to Wiggins at the 2012 Tour but was the team leader at the next edition, where a memorable surge up Mont Ventoux leads him to his first Tour de France title</p>',
    },
    {
        title: 'Hat-trick of Tour titles',
        date: 'July 2016',
        body:
            '<p>After crashing out early in 2014, Froome bounces back to win the 2015 edition after a battle through the mountains with Nairo Quintana. Froome defends his title in all-action style in 2016, even running a few yards up Ventoux when his bike is damaged</p>',
    },
    {
        title: 'Tour-Vuelta double',
        date: 'September 2017',
        body:
            '<p>Froome wins his fourth Tour de France, and third in succession, in 2017 and follows it up with a second Vuelta title. He becomes the first rider from outside France to win the Tour and Vuelta back-to-back</p>',
    },
    {
        title: ' Giro win completes collection',
        date: 'June 2018',
        body:
            '<p>Froome gets the better of Simon Yates in a spectacular ride on the Colle delle Finestre to win his first Giro and complete his Grand Tour collection. At the 2018 Tour, he ends up working to lead his teammate, Geraint Thomas, to overall victory</p>',
    },
];
