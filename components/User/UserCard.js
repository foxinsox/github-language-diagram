import React from 'react';
import Link from 'next/link';
import {
 Button, Card, Image, Dimmer, Loader, Segment 
} from 'semantic-ui-react';

function UserCard({ result }) {
    const [isHovering, setIsHovering] = React.useState(false);

    return (
      <Card
        fluid
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* <Link href=""> */}
        <Card.Content>
          <Image floated="right" size="mini" src={result.avatar_url} />
          <Card.Header>{result.login}</Card.Header>
          <Card.Meta>{result.type}</Card.Meta>
        </Card.Content>
        {/* </Link> */}
      </Card>
    );
}

export default UserCard;
