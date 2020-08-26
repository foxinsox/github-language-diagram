/* eslint-disable max-lines-per-function */
import React from 'react';
import { Octokit } from '@octokit/rest';
import axios from 'axios';
import mockData from '../../repos_mockData.json';
import { ResponsivePie } from '@nivo/pie';

const octokit = new Octokit();

function Repos({ _user }) {
    const [data, setData] = React.useState(null);
    const [processStage, setProcessStage] = React.useState({ text: 'listing repositories...' });
    const [rendering, setRendering] = React.useState(true);

    function hasContributions(repo) {
        if (repo.fork) {
            const created = new Date(repo.created_at);
            const updated = new Date(repo.updated_at);
            const differenceInSeconds = (updated.getTime() - created.getTime()) / 1000;
            if (differenceInSeconds < 30) return false;
        }
        return true;
    }

    function calculatePercentage(languageData) {
        let totalSize = 0;
        for (const value of languageData.values()) {
            totalSize += value;
        }
        function calculatePercentage(val, key, map) {
            map.set(key, Math.round((val / totalSize) * 100));
        }
        languageData.forEach(calculatePercentage);
        setRendering(false);
        setData(languageData);
    }

    function prepareLanguageData(repos) {
        const languageDataTotal = new Map();
        const contributedRepos = repos.filter((repo) => hasContributions(repo));
        contributedRepos.forEach((repo) => {
            setProcessStage({ text: `retrieving language info for ${repo.name}` });
            const language = repo.language || 'unknown';
            let size = parseInt(repo.size);
            if (language in languageDataTotal.keys) {
                size += languageDataTotal.get(language);
            }
            languageDataTotal.set(language, size);
        });
        const languageDataPercent = calculatePercentage(languageDataTotal);
        console.log(languageDataPercent);
    }

    React.useEffect(() => {
        const fetchRepos = async () => {
            try {
                /*
                const response = await octokit.request(`GET /users/${_user}/repos`);
                console.log(response.data);
                setProcessStage({ text: 'retrieving language info for each repository...' });
                prepareLanguageData(response.data);
                */
                prepareLanguageData(mockData);
            } catch (error) {
                alert(err);
                setRendering(false);
            }
        };
        fetchRepos();
    }, []);


    function renderDiagram() {
        return <p>{data}</p>
    }

    return (
        <div className="diagramPage">
            {rendering ? <p>{processStage.text}</p> : renderDiagram()}
        </div>
    );
}

Repos.getInitialProps = async (ctx) => {
    const { _user } = ctx.query;
    return { _user };
};

export default Repos;
