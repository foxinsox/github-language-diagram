/* eslint-disable max-lines-per-function */
import React from 'react';
import { Octokit } from '@octokit/rest';
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

    function mapToDiagramData(languageDataTotal) {
        const diagramData = [];
        languageDataTotal.forEach((value, key) => {
            const section = {
                id: String(key),
                label: String(key),
                value: parseInt(value)
            };
            diagramData.push(section);
        });
        return diagramData;
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

        const diagramData = mapToDiagramData(languageDataTotal);
        setData(diagramData);
        setRendering(false);
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
        return (
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        );
    }

    return (
        <div className="diagramPage" style={{ height: 100 + 'vh' }}>
            {rendering ? <p>{processStage.text}</p> : renderDiagram()}
        </div>
    );
}

Repos.getInitialProps = async (ctx) => {
    const { _user } = ctx.query;
    return { _user };
};

export default Repos;
