import React from 'react';
import { Octokit } from '@octokit/rest';
import mockData from '../../repos_mockData.json';
import { ResponsivePie } from '@nivo/pie';
import { Dimmer, Loader } from 'semantic-ui-react';
import Link from 'next/link';

import styles from '../../styles/Diagram.module.css';

const octokit = new Octokit();

/** For mocking purposes and in order to save API calls */
const mockAPICall = false;

function Repos({ _user }) {
    const [data, setData] = React.useState(null);
    const [progress, setProgress] = React.useState({ text: 'listing repositories...' });
    const [rendering, setRendering] = React.useState(true);

    /** Let's check if the repo has had any activity by user. Set to false if less than 30 sec between fork timestamp and last update timestamp. */ 
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
            setProgress({ text: `retrieving language info for ${repo.name}` });
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
                if (mockAPICall) {
                    setProgress({ text: 'retrieving language info for each repository...' });
                    prepareLanguageData(mockData);
                } else {
                    const response = await octokit.request(`GET /users/${_user}/repos`);
                    setProgress({ text: 'retrieving language info for each repository...' });
                    prepareLanguageData(response.data);
                }
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
        <div className={styles.container}>
            <Dimmer active={rendering} inverted>
                <Loader>Rendering</Loader>
            </Dimmer>
            <div>
                <Link href="/">
                    <a>back</a>
                </Link>
                <h3>Language Diagram for {_user}</h3>
            </div>
            <div className={styles.diagram}>
                {rendering ? (
                    <div className={styles.progressText}>{progress.text}</div>
                ) : (
                    renderDiagram()
                )}
            </div>
        </div>
    );
}

Repos.getInitialProps = async (ctx) => {
    const { _user } = ctx.query;
    return { _user };
};

export default Repos;
