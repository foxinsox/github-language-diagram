import Link from 'next/link';

function DiagramHeading({ user }) {
  const heading = `language diagram for ${user}:`;
    return (
      <div>
        <Link href="/" className="backButton">
          <a>back</a>
        </Link>
        <h3>
          {heading}
        </h3>
      </div>
    );
}

export default DiagramHeading;
