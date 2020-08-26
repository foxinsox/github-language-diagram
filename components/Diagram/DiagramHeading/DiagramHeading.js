import Link from 'next/link';

function DiagramHeading({ user }) {
    return (
      <div>
        <Link href="/" className="backButton">
          <a>back</a>
        </Link>
        <h3>
          Language Diagram for
          {user}
        </h3>
      </div>
    );
}

export default DiagramHeading;
