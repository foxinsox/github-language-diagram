import { Container, Pagination } from 'semantic-ui-react';

function UserPagination({ currentPage, totalPages, setPage }) {
    return (
      <Container textAlign="center">
        <Pagination
          totalPages={totalPages}
          boundaryRange={1}
          siblingRange={0}
          firstItem={false}
          lastItem={false}
                // nextItem={"next"}
                // prevItem={"previous"}
          pointing
          secondary
                // inverted={inverted}
          activePage={currentPage}
          onPageChange={(event, data) => {
                    setPage(data.activePage);
                }}
        />
      </Container>
    );
}

export default UserPagination;
