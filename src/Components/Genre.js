import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import Menu from './Menu';
const Genre = () => {
    const { slug } = useParams();
    const [getdata, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const items = getdata?.data?.data?.items;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://otruyenapi.com/v1/api/the-loai/${slug}`);
                setData(response);
                setLoading(false);
                console.log(response);

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <Helmet>
                <title>{getdata.data.data.seoOnPage.titleHead}</title>
            </Helmet>
            <Container>
                <Menu></Menu>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>{getdata.data.data.seoOnPage.titleHead}</Card.Title>
                                {getdata.data.data.seoOnPage.descriptionHead}</Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {items && items.length > 0 ? (items.map((item, index) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>{item.updatedAt}</Card.Text>
                                    <Card.Text>
                                        {item.category && item.category.length > 0 ? (item.category.map((category, index) => (
                                            <Badge bg="info" key={index}>
                                                {category.name}
                                            </Badge>
                                        ))
                                        ) :
                                            "Other"
                                        }
                                    </Card.Text>
                                    <Button variant="primary btn-sm" as={Link} to={`/comics/${item.slug}`}>More detail</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                    ) : (
                        <Col>
                            <CardBody>NO content avaiable</CardBody>
                        </Col>
                    )}


                </Row>
            </Container>
        </div>
    );
};

export default Genre;