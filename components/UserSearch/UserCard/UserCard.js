import React from 'react';
import Link from 'next/link';
import { Button, Card, Image, Dimmer, Loader, Segment } from 'semantic-ui-react';

function UserCard({ avatarUrl, login, type }) {
    // const [isHovering, setIsHovering] = React.useState(false);

    // function applyHoverStyle() {
    //     let style = {};
    //     if (isHovering) {
    //         style = { backgroundColor: 'PaleGoldenRod', cursor: 'pointer' };
    //     }
    //     return style;
    // }

    return (
        // <Link href="/somewhereovertherainbow">
            <Card
                href={`/repos/${login}`}
                fluid
                // onMouseEnter={() => setIsHovering(true)}
                // onMouseLeave={() => setIsHovering(false)}
                // style={applyHoverStyle()}
                >
                <Card.Content>
                    <Image floated="right" size="mini" src={avatarUrl} alt={login} />
                    <Card.Header>{login}</Card.Header>
                    <Card.Meta>{type}</Card.Meta>
                </Card.Content>
            </Card>
        // </Link>
    );
}

export default UserCard;
