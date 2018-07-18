import React from 'react';
import { Row, Col, Container, Button, Badge, Card, CardBody, CardHeader } from 'reactstrap';
import PriceChart from 'Components/PriceChart';
export const ProductPage = (props) => {
    const product = props.location && props.location.state && props.location.state.product;
    if (!product) {
        props.history.push({
            pathname: '/searchpage',
        });
        return;
    }

    const content = <Container>
        <h4><Badge color="primary" className="mr-2">{product.brand}</Badge>{product.product_name}</h4>
        <Badge color="success" className="mr-2">{product.ps_category}</Badge>
        <p>
            {product.description}
        </p>
        <Button color="primary" disabled><strong>PRICE: {product.price}</strong></Button>

    </Container>;
    return <Container>
        <Card>
            <CardHeader className="sticky-header">
                <Button color="warning" onClick={() => {
                    props.history.goBack();
                }}>BACK</Button>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center" md="4">
                        <img width="100%" src={product.image_url} alt="product" className="img-fliud m-2" />
                    </Col>
                    <Col>
                        {content}
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <PriceChart type="line" data={product.price_history} />
                    </Col>
                    <Col>
                        <PriceChart data={product.price_history} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </Container>
};

