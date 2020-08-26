/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Octokit } from '@octokit/rest';
import { render } from '@testing-library/react';
import nock from 'nock';

import mockData from '../../repos_mockData.json';

describe('[_user].js', () => {
    test('should fetch repos of user', async () => {
        const octokit = new Octokit();
        const scope = nock('https://api.github.com')
            .get('/users/foxinsox/repos')
            .reply(200, mockData);
        await octokit.request('/users/foxinsox/repos');
        scope.done();
    });
});
