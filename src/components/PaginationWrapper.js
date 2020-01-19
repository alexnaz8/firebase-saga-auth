import React from "react";
import Pagination from "react-js-pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const PaginationWrapper = ({
    totalAmount,
    itemsCountPerPage = 4,
    pageRangeDisplayed = 5,
    activePage,
    setActivePage,
    children,
    itemClass = "page-item",
    linkClass = "page-link"
}) => {
    const handlePageChange = value => {
        setActivePage(value);
    };
    const showPagination = totalAmount > itemsCountPerPage;
    return (
        <Container>
            {showPagination ? (
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalAmount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={handlePageChange}
                    itemClass={itemClass}
                    linkClass={linkClass}
                />
            ) : null}
            <Row>{children}</Row>
            {showPagination ? (
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalAmount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={handlePageChange}
                    itemClass={itemClass}
                    linkClass={linkClass}
                />
            ) : null}
        </Container>
    );
};

export default PaginationWrapper;
