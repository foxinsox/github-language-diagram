import React from 'react';
import Link from 'next/link';
import {
 Button, Card, Image, Dimmer, Loader, Segment 
} from 'semantic-ui-react';

function UserCard({ avatarUrl, login, type }) {
    const [isHovering, setIsHovering] = React.useState(false);

    return (
      <Card
        fluid
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* <Link href=""> */}
        <Card.Content>
          <Image floated="right" size="mini" src={avatarUrl} alt={login} />
          <Card.Header>{login}</Card.Header>
          <Card.Meta>{type}</Card.Meta>
        </Card.Content>
        {/* </Link> */}
      </Card>
    );
}

export default UserCard;
