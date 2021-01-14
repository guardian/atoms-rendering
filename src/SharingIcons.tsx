import React from 'react';
import { css, cx } from 'emotion';

import { border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { Pillar } from '@guardian/types';

import TwitterIcon from './icons/twitter.svg';
import FacebookIcon from './icons/facebook.svg';
import EmailIcon from './icons/email.svg';
import WhatsAppIcon from './icons/whatsapp.svg';
import MessengerIcon from './icons/messenger.svg';

import { pillarPalette } from './lib/pillarPalette';

type SharePlatform =
    | 'facebook'
    | 'twitter'
    | 'email'
    | 'whatsApp'
    | 'messenger';

const shareIconList = css`
    float: left;
    ${from.wide} {
        flex: auto;
    }
`;

const shareIconsListItem = css`
    padding: 0 3px 6px 0;
    float: left;
    min-width: 32px;
    cursor: pointer;
`;

const shareIcon = (colour: string) => css`
    border: 1px solid ${border.secondary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 32px;
    max-width: 100%;
    width: auto;
    height: 32px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    box-sizing: content-box;

    svg {
        height: 88%;
        width: 88%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        position: absolute;
    }

    :hover {
        background-color: ${colour};
        border-color: ${colour};
        fill: white;
    }
`;

const mobileOnlyShareIconsListItem = css`
    ${from.phablet} {
        display: none;
    }
`;

interface ShareListItemType {
    id: SharePlatform;
    Icon: React.ComponentType;
    url: string;
    userMessage: string;
    mobileOnly: boolean;
}

export const SharingIcons = ({
    sharingUrls,
    displayIcons,
    pillar,
    className,
}: {
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        };
    };
    displayIcons: SharePlatform[];
    pillar: Pillar;
    className?: string;
}): JSX.Element => {
    const icons: { [K in SharePlatform]?: React.ComponentType } = {
        facebook: FacebookIcon,
        twitter: TwitterIcon,
        email: EmailIcon,
        whatsApp: WhatsAppIcon,
        messenger: MessengerIcon,
    };

    const mobileOnlyIcons: SharePlatform[] = ['whatsApp', 'messenger'];

    const shareList = displayIcons.reduce((list: ShareListItemType[], id) => {
        const icon = icons[id];
        const sharingUrl = sharingUrls[id];

        if (icon && sharingUrl) {
            const listItem: ShareListItemType = {
                id,
                Icon: icon,
                mobileOnly: mobileOnlyIcons.includes(id),
                ...sharingUrl,
            };
            list.push(listItem);
        }

        return list;
    }, []);

    return (
        <ul className={cx(shareIconList, [className])}>
            {shareList.map((shareListItem) => {
                const {
                    Icon,
                    id,
                    url,
                    userMessage,
                    mobileOnly,
                } = shareListItem;

                return (
                    <li
                        className={cx(shareIconsListItem, {
                            [mobileOnlyShareIconsListItem]: mobileOnly,
                        })}
                        key={`${id}Share`}
                    >
                        <a
                            href={url}
                            role="button"
                            aria-label={userMessage}
                            target="_blank"
                        >
                            <span
                                className={cx(
                                    shareIcon(pillarPalette[pillar][400]),
                                    css`
                                        fill: ${pillarPalette[pillar][400]};
                                    `,
                                )}
                            >
                                <Icon />
                            </span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};
