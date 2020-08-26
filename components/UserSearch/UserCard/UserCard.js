import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Link from 'next/link';

function UserCard({ avatarUrl, login, type }) {
    return (
        <Link href={`/repos/${login}`}>
            <Card>
                <Image src={avatarUrl} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{login}</Card.Header>
                    <Card.Meta>{type}</Card.Meta>
                </Card.Content>
            </Card>
        </Link>
    );
}

export default UserCard;
