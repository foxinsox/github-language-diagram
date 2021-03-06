/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Octokit } from '@octokit/rest';
import { render } from '@testing-library/react';
import nock from 'nock';

import UserSearch from './UserSearch';
import mockData from '../../users_mockData.json';

describe('UserSearch', () => {
    test('should fetch users', async () => {
        const octokit = new Octokit();
        const scope = nock('https://api.github.com')
            .get('/search/users?q=foxinsox')
            .reply(200, mockData);
        await octokit.request('/search/users?q=foxinsox');
        scope.done();
    });
});
