/* eslint-disable max-lines-per-function */
import React from 'react';
import { Button, Select, Input } from 'semantic-ui-react';

const options = [
    { key: 'any', text: 'Any', value: 'any' },
    { key: 'user', text: 'User', value: 'user' },
    { key: 'organization', text: 'Organization', value: 'organization' }
];

function UserSearchbar({ setQuery, applySearch }) {
    const [searchString, setSearchString] = React.useState(null);
    const [searchOption, setSearchOption] = React.useState(null);
    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    function defineQuery() {
        let q = `${searchString}`;
        if (searchOption === 'user' || searchOption === 'organization') q += `+type:${searchOption}`;
        return q;
    }

    React.useEffect(() => {
        const query = defineQuery();
        setQuery(query);
    }, [searchString, searchOption]);

    function searchSpace(event) {
        const keyword = event.target.value;
        if (keyword === undefined || keyword === '') setButtonDisabled(true);
        else setButtonDisabled(false);
        setSearchString(keyword);
    }

    function setOption(e, { value }) {
        setSearchOption(value);
    }

    function startSearch() {
        applySearch();
    }

    return (
      <Input data-testid="searchbar" type="text" placeholder="Search..." action>
        <input onChange={(e) => searchSpace(e)} />
        <Select
          compact
          options={options}
          defaultValue="any"
          onChange={(e, { value }) => setOption(e, { value })}
        />
        <Button type="submit" onClick={() => startSearch()} disabled={buttonDisabled}>
          Search
        </Button>
      </Input>
    );
}

export default UserSearchbar;
