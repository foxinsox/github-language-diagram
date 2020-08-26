/* eslint-disable max-lines-per-function */
import React from 'react';
import { Octokit } from '@octokit/rest';
import {
    Container,
    Card,
    Dimmer,
    Loader,
    Segment,
} from 'semantic-ui-react';

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

    // React.useEffect(() => {
    //     console.log(searching);
    // }, [searching]);

    function mapResultsToCards() {
        return results.items.map((result) => 
          <UserCard avatarUrl={result.avatar_url} login={result.login} type={result.type} key={result.id}/>);
    }

    function applySearch() {
        setSearching(true);
        console.log(`searching: ${query} on page ${page}`);
        octokit.search
            .users({
                q: query,
                per_page: itemsPerPage,
                page
            })
            .then(({ data }) => {
                setSearching(false);
                setResults(data);
            })
            .catch((err) => alert(err));
    }

    React.useEffect(() => {
        if (page && query) applySearch();
    }, [page]);

    // React.useEffect(() => {
    //     console.log(query);
    // }, [query]);

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
