import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { LinkButton } from '@guardian/src-button';

import { SvgTwitter, SvgFacebook, SvgEnvelope } from '@guardian/src-icons';
import { WhatsappIcon } from './icons/whatsapp';
import { MessengerIcon } from './icons/messenger';
import { LinkedInIcon } from './icons/linked-in';
import { PinterestIcon } from './icons/pinterest';

import { SharePlatformType } from './types';

const shareIconList = css`
    display: flex;
    flex-direction: row;
    ${from.wide} {
        flex: auto;
    }

    a {
        margin-right: 5px;
    }
`;

const mobileOnlyShareIconsListItem = css`
    ${from.phablet} {
        display: none;
    }
`;

interface ShareListItemType {
    id: SharePlatformType;
    Icon: React.ComponentType;
    url: string;
    userMessage: string;
    mobileOnly: boolean;
}

export const SharingIcons = ({
    sharingUrls,
    displayIcons,
}: {
    sharingUrls: {
        [K in SharePlatformType]?: {
            url: string;
            userMessage: string;
        };
    };
    displayIcons: SharePlatformType[];
}): JSX.Element => {
    const icons: { [K in SharePlatformType]?: React.ComponentType } = {
        facebook: SvgFacebook,
        twitter: SvgTwitter,
        email: SvgEnvelope,
        whatsApp: WhatsappIcon,
        messenger: MessengerIcon,
        linkedIn: LinkedInIcon,
        pinterest: PinterestIcon,
    };

    const mobileOnlyIcons: SharePlatformType[] = ['whatsApp', 'messenger'];

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
        <div className={shareIconList}>
            {shareList.map((shareListItem) => {
                const {
                    Icon,
                    id,
                    url,
                    userMessage,
                    mobileOnly,
                } = shareListItem;

                return (
                    <div
                        className={
                            mobileOnly ? mobileOnlyShareIconsListItem : ''
                        }
                        key={`${id}Share`}
                    >
                        <LinkButton
                            hideLabel={true}
                            href={url}
                            role="button"
                            aria-label={userMessage}
                            target="_blank"
                            rel="noreferrer"
                            icon={<Icon />}
                            priority="tertiary"
                        >
                            {userMessage}
                        </LinkButton>
                    </div>
                );
            })}
        </div>
    );
};
