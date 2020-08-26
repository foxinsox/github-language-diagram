/* eslint-disable max-lines-per-function */
import React from 'react';
import axios from 'axios';
import { Octokit } from '@octokit/rest';
import { Container, Card, Dimmer, Loader, Segment } from 'semantic-ui-react';

import UserSearchbar from './UserSearchbar/UserSearchbar';
import UserCard from './UserCard/UserCard';
import UserPagination from './UserPagination/UserPagination';

const itemsPerPage = 24;
const octokit = new Octokit();

function UserSearch() {
    const [searching, setSearching] = React.useState(null);
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState(null);
    const [page, setPage] = React.useState(null);

    React.useEffect(() => {
        console.log(results);
    }, [results]);

    function mapResultsToCards() {
        return results.items.map((result) => (
            <UserCard
                avatarUrl={result.avatar_url}
                login={result.login}
                type={result.type}
                key={result.id}
            />
        ));
    }

    async function applySearch() {
        try {
            setSearching(true);
            // console.log(`searching: ${query} on page ${page}`);
            const response = await octokit.request('GET /search/users', {
                q: query,
                per_page: itemsPerPage,
                page
            });
            setSearching(false);
            setResults(response.data);
        } catch (error) {
            //TODO: handle rate limits (10 per minute for unauthorized search requests)
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request.data);
                console.log(error.request.status);
                console.log(error.request.headers);
            } else {
                console.error(error);
            }
            setSearching(false);
            alert(error);
        }
    }

    React.useEffect(() => {
        if (page && query) applySearch();
    }, [page]);

    return (
        <>
            <Container textAlign="center">
                <UserSearchbar setQuery={setQuery} applySearch={applySearch} />
                <Segment>
                    <Dimmer active={searching}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    {results.items && <Card.Group>{mapResultsToCards()}</Card.Group>}
                    {results.total_count > itemsPerPage ? (
                        <UserPagination
                            currentPage={page}
                            totalPages={Math.ceil(results.total_count / itemsPerPage)}
                            setPage={setPage}
                        />
                    ) : (
                        <></>
                    )}
                </Segment>
            </Container>
        </>
    );
}

export default UserSearch;
