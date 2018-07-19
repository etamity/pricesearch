import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, Container, Row, Col, Label, FormGroup, InputGroup, InputGroupAddon, Input, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown } from 'reactstrap';
import { connect } from 'react-redux';
import Products from 'Services/Products';
import ProductCard from 'Components/ProductCard';
import ScrollerContainer from 'react-infinite-scroller';
import Loader from 'Components/Loader';
class SearchPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            currentPage: 1,
            filter: null,
            filters: 'None,Dyson,Hoover',
            sort: null,
            limit: 10,
            orderbyDropdownOpen: false,
            filtersDropdownOpen: false
        }
        this.doSearch = this.doSearch.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.filterResults = this.filterResults.bind(this);
        this.sortResults = this.sortResults.bind(this);
        this.filtersToggle = this.filtersToggle.bind(this);
        this.orderbyToggle = this.orderbyToggle.bind(this);
        this.getParams = this.getParams.bind(this);
        this.showProductDetail = this.showProductDetail.bind(this);
    }

    showProductDetail(product) {
        this.props.history.push({
            pathname: '/productpage',
            state: { product }
        })
        // reset scrollbar to top
        window.scrollTo(0, 0);
    }

    getParams(sort, filter, nextPage) {
        let params = {
            q: this.state.searchText,
        }
        if (filter !== 'None' && filter) {
            params = Object.assign({}, params, {
                brand: filter
            });
        }

        if (sort) {
            params = Object.assign({}, params, {
                _sort: 'price',
                _order: sort,
            });
        }
        params = Object.assign({}, params, {
            _page: this.state.currentPage,
            _limit: this.state.limit
        });
        return params;
    }

    orderbyToggle() {
        this.setState({
            orderbyDropdownOpen: !this.state.orderbyDropdownOpen,
        });
    }

    filtersToggle() {
        this.setState({
            filtersDropdownOpen: !this.state.filtersDropdownOpen,
        });
    }

    sortResults(sort) {
        Products.find(this.getParams(sort, this.state.filter), true);
        this.setState({ sort });
    }

    filterResults(filter) {
        Products.find(this.getParams(this.state.sort, filter), true);
        this.setState({ filter })

    }

    updateSearchText(value) {
        this.setState({ searchText: value });
    }

    loadNextPage(nextPage) {
        this.setState({ currentPage: nextPage });
        const params = Object.assign({}, this.getParams(), {
            _page: nextPage
        })
        Products.find(params);
    }

    doSearch() {
        this.setState({ currentPage: 1 });
        Products.find(this.getParams(), true);
    }

    render() {
        const nextPage = parseInt(this.props.pagination && this.props.pagination.next && this.props.pagination.next._page || 0);
        const filters = <ButtonDropdown className="ml-1" isOpen={this.state.filtersDropdownOpen} toggle={() => { this.filtersToggle(1); }}>
            <DropdownToggle caret color="primary">
                Filters
            </DropdownToggle>
            <DropdownMenu>
                {this.state.filters.split(',').map((filter, index) => {
                    return <DropdownItem key={index} color="primary" onClick={(e) => {
                        this.filterResults(filter);
                    }} active={this.state.filter === filter}>{filter}</DropdownItem>
                })}
            </DropdownMenu>
        </ButtonDropdown>;

        const orderby = <ButtonDropdown className="ml-1" isOpen={this.state.orderbyDropdownOpen} toggle={() => { this.orderbyToggle(1); }}>
            <DropdownToggle caret color="primary">
                Order By
    </DropdownToggle>
            <DropdownMenu>
                <DropdownItem color="primary" onClick={() => {
                    this.sortResults();
                }} active={!this.state.sort}>Best Match</DropdownItem>
                <DropdownItem color="primary" onClick={() => {
                    this.sortResults('asc');
                }} active={this.state.sort === 'asc'}>Price Low to High</DropdownItem>
                <DropdownItem color="primary" onClick={() => {
                    this.sortResults('desc');
                }} active={this.state.sort === 'desc'}>Price High to Low</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>;
        return (<Container>
            <Card>
                <CardHeader className="sticky-header">
                    <Row>
                        <Col className="text-center">
                            <Label> <h2>Search Prices</h2> </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup className="input-prepend">
                                    <Input type="text"
                                        placeholder="Enter Products Keywords" value={this.state.searchText} onChange={(e) => this.updateSearchText(e.target.value)}></Input>
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" onClick={this.doSearch}>Search</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Col>
                                    {filters}
                                    {orderby}
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.props.results.length <= 0 && <Row>
                        <Col className="text-center">
                            <span id="unbiased-copy">100% Unbiased Product Search Engine</span>
                        </Col>
                    </Row>}
                    {this.props.error && <p className="text-danger"><strong>Something wrong: {this.props.error}</strong></p> }
                
                    <ScrollerContainer
                        pageStart={0}
                        loadMore={() => {
                            this.loadNextPage(nextPage)
                        }}
                        hasMore={this.state.currentPage < nextPage}
                        loader={<Loader key={0}></Loader>}
                    >
                        {this.props.results && this.props.results.map((item, index) => <ProductCard onClick={() => {
                            this.showProductDetail(item);
                        }} key={index} product={item} />)}
                    </ScrollerContainer>

                    <Row>
                        <Col className="text-center">
                            {this.props.loading && <Loader />}
                        </Col>
                    </Row>
                </CardBody>

            </Card>
        </Container>
        )
    }
};

const mapStateToProps = state => {
    return {
        results: state.search.results,
        pagination: state.search.pagination,
        filters: state.search.filters,
        sort: state.search.sort,
        loading: state.search.loading,
        error: state.search.error
    }
}

export const SearchPage = connect(
    mapStateToProps
)(SearchPageView)