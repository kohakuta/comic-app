import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom'
import Menu from './Menu';

const Detail = () => {
  const { slug } = useParams();
  const [getdata, setData] = useState([]);
  const [getdataChaper, setDataChapter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleClose = () => setisModalOpen(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const item = getdata?.data?.data?.item;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        setData(response);
        setLoading(false);
        console.log(response);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleReadChapter = async (chapter_api) => {
    try {
      const response = await axios.get(`${chapter_api}`);
      setDataChapter(response.data);
      setLoading(false);
      console.log(response);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setisModalOpen(true);
  };
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
          <Col>
            <Card style={{ width: '30rem' }}>
              <Card.Img variant="top" src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`} />
              <Card.Body>
                <Card.Title>{item.name || "No title"}</Card.Title>
                <Card.Text>{item.updatedAt}</Card.Text>
                <Card.Title dangerouslySetInnerHTML={{ __html: item.content }}></Card.Title>

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
                <Card.Title>{item.status || "Unknow"}</Card.Title>
               
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <ListGroup className="scrollable-list">

              {item.chapters && item.chapters.length > 0 ? (
                item.chapters.map((chapter, index) => (
                  <div key={index}>
                    <h5>{chapter.server_name}</h5>
                    <ListGroup.Item>
                      {chapter.server_data && chapter.server_data.length > 0 ? (
                        chapter.server_data.map((listchapter, subindex) => (
                          <div className="chapter-click" key={subindex} onClick={() => handleReadChapter(listchapter.chapter_api_data)}>Chapter: {listchapter.chapter_name}</div>
                        ))) : (
                        <span>Chapter is coming soon...</span>)}
                    </ListGroup.Item>
                  </div>

                ))
              ) :
                <span>Chapter is coming soon...</span>
              }
            </ListGroup>
          </Col>
        </Row>
        <Row>
          {
            isModalOpen && (
              <Modal show={isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title> Chaper{getdataChaper.data.item.chapter_name} - {getdataChaper.data.item.comic_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {getdataChaper.data.item.chapter_image.length > 0 ?
                    (getdataChaper.data.item.chapter_image.map((chapterImage, index) =>
                      <Card.Img style={{ margin: 0 }} variant="top"
                        src={`${getdataChaper.data.domain_cdn}/${getdataChaper.data.item.chapter_path}/${chapterImage.image_file}`}>
                      </Card.Img>
                    )) : "No image"
                  }

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )
          }

        </Row>
      </Container>
    </div>
  )
}

export default Detail