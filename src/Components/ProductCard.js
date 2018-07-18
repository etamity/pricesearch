import React from 'react';
import { Container, Row, Col, Button, Badge, InputGroupAddon, InputGroup, FormGroup } from 'reactstrap';
import PriceChart from './PriceChart';
const ProductCard = (props) => {
    if (!props.product) {
        return <div />;
    }
    const content = <Container>
        <h4 onClick={props.onClick} className="c-pointer"><Badge color="primary" className="mr-2">{props.product.brand}</Badge>{props.product.product_name}</h4>
        <Badge color="success" className="mr-2">{props.product.ps_category}</Badge>
        <p>
            {props.product.description.substring(0, 200) + ' ...'}
        </p>
        <FormGroup>
            <InputGroup className="input-prepend">
                <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={props.onClick}><strong>PRICE: {props.product.price}</strong></Button>
                    <Button color="info" onClick={props.onClick}><strong>DETAIL</strong></Button>
                </InputGroupAddon>
            </InputGroup>
        </FormGroup>
    </Container>;

    const thumbnail = <img onClick={props.onClick} src={props.product.image_url} className="img-fluid c-pointer" style={{ maxHeight: '200px' }} />
    return <Row className="my-5 product-card-row">
        <Col className="d-flex align-items-center justify-content-center" md="2">
            {thumbnail}
        </Col>
        <Col className="d-flex align-items-center justify-content-center p-3" md="6">
            {content}
        </Col>
        <Col md="4">
            <PriceChart data={props.product.price_history} />
        </Col>
    </Row>
};

export default ProductCard;