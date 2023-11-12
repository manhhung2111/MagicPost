import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./HomeTestimonials.scss";

function HomeTestimonials() {
  return (
    <Container className="testimonials-container">
      <Row className="mb-3">
        <Col sm={12} className="header">
          <h1 class="mb-2 text-center">Meet real customers</h1>
          <p>
            Learn how different companies have benefited from our digital
            logistics services to grow their business and move their goods
            internationally.
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Card className="testimonial-card">
            <Card.Body>
              <blockquote className="blockquote">
                <p>
                  Everyone's on the same page. Many of our people are not very
                  organized naturally, so Magic Post is a godsend!
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </Card.Body>
          </Card>
          <Card className="mt-4 testimonial-card">
            <Card.Body>
              <blockquote className="blockquote">
                <p>
                  Magic Post is a game-changer. Instead of drowning in an
                  endless chain of emails, there is clear and easy
                  accountability meaning tasks actually get done!
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="testimonial-card">
            <Card.Body>
              <blockquote className="blockquote">
                <p>
                  I love Magic Post! This is an amazing service and it has saved
                  me and my small business so much time. I plan to use it for a
                  long time to come.
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </Card.Body>
          </Card>
          <Card className="mt-4 testimonial-card">
            <Card.Body>
              <blockquote className="blockquote">
                <p>
                  Magic Post has helped my team and I stay on the same page.
                  Previously, we were all over the board. Using Magic Post has
                  definitely saved us time and money. I would recommend Magic
                  Post for anyone trying to get the word out about their
                  business. It has saved me so much time!
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="testimonial-card">
            <Card.Body>
              <blockquote className="blockquote">
                <p>
                  If you are a business owner, and you don't have Magic Post in
                  your toolkit just yet, I highly recommend that you check it
                  out.
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </Card.Body>
          </Card>
          <Card className="mt-4 testimonial-card">
            <Card.Body>
              <blockquote className="blockquote">
                <p>
                  Magic Post makes me more productive and gets the job done in a
                  fraction of the time. I'm glad I found Magic Post.
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeTestimonials;
