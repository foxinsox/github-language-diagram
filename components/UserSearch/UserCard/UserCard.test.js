/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';

import UserCard from './UserCard';

describe('UserCard', () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            avatarUrl: 'https://avatars0.githubusercontent.com/u/8191065?v=4',
            login: 'foxinsox',
            type: 'User'
        };
    });

    test('Props should be visible', () => {
        const { getByText, getByAltText } = render(<UserCard {...expectedProps} />);
        const login = getByText(expectedProps.login);
        const type = getByText(expectedProps.type);
        const image = getByAltText(expectedProps.login);

        expect(login).toBeVisible;
        expect(type).toBeVisible;
        expect(image).toBeVisible;
    });

    test('OnClick should route to diagram page',() => {
        //TODO: implement
    });
});
