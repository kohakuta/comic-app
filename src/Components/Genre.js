import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, CardGroup, Col, Container, Pagination, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';
import Header from './Header';
const Genre = () => {
    const { slug } = useParams();
    const [getdata, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const items = getdata?.data?.items;
    const itemperpagge = 24;
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://otruyenapi.com/v1/api/the-loai/${slug}?page=${currentPage}`);
                setData(response.data);
                setLoading(false);
                console.log(response);

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [slug, currentPage]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const totalPages = getdata?.data?.params?.pagination?.totalItems || 0;
    const totalPage = Math.ceil(totalPages / itemperpagge);//Tông số trang chia cho số item trên 1 trang để ra số trang

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <Helmet>
                <title>{getdata.data.seoOnPage.titleHead}</title>
            </Helmet>
            <Header></Header>
            <Container className="mt-3">
                <Menu></Menu>
                <div><hr></hr></div>
                <Pagination className="pagination-container">

                    <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPage)].map((_, index) => {
                        const pageNumber = index + 1;
                        const rangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
                        const rangeEnd = Math.min(rangeStart + 4, totalPage);
                        if (pageNumber >= rangeStart && pageNumber <= rangeEnd) {
                            return (
                                <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)}>
                                    {pageNumber}
                                </Pagination.Item>
                            );
                        }
                    }
                    )
                    }
                    <Pagination.Next onClick={() => currentPage < totalPage && handlePageChange(currentPage + 1)} disabled={currentPage === totalPage} />

                </Pagination>
                <Row style={{paddingBottom: '20px'}}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>{getdata.data.seoOnPage.titleHead}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Row style={{ margin: '0 auto' }}>
                        {items && items.length > 0 ? (
                            items.map((item, index) => (
                                <Col xs={6} sm={4} md={3} lg={2} key={index}>
                                    <CardGroup style={{ height: '100%' }}>
                                        <Card as={Link} to={`/comics/${item.slug}`}
                                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>

                                            {/* Ảnh truyện */}
                                            <Card.Img
                                                variant="top"
                                                src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
                                                style={{ objectFit: 'cover', height: '255px', width: '100%' }}
                                            />

                                            {/* Nội dung */}
                                            <Card.Body style={{ flexGrow: 1 }}>
                                                <Card.Title className="card-title">{item.name}</Card.Title>
                                                <Card.Text>{item.updatedAt}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                {item.category && item.category.length > 0 ? (item.category.map((category, index) => (
                                                    <Badge bg="info" key={index}>
                                                        {category.name}
                                                    </Badge>
                                                ))
                                                ) :
                                                    "Other"
                                                }
                                            </Card.Footer>
                                        </Card>
                                    </CardGroup>
                                </Col>

                            ))
                        ) : (
                            <Col>
                                <CardBody>No content available</CardBody>
                            </Col>
                        )}
                    </Row>
                </Row>
                <div><hr></hr></div>
                <Pagination className="pagination-container">

                    <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPage)].map((_, index) => {
                        const pageNumber = index + 1;
                        const rangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
                        const rangeEnd = Math.min(rangeStart + 4, totalPage);
                        if (pageNumber >= rangeStart && pageNumber <= rangeEnd) {
                            return (
                                <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)}>
                                    {pageNumber}
                                </Pagination.Item>
                            );
                        }
                    }
                    )
                    }
                    <Pagination.Next onClick={() => currentPage < totalPage && handlePageChange(currentPage + 1)} disabled={currentPage === totalPage} />

                </Pagination>

            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Genre;