import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Image,
  Item,
  Label,
  Dimmer,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { productListUrl } from "../Constants";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    loading: false,
    error: null,
    data: [],
  };
  componentDidMount() {
    this.handleFethItems();
  }

  handleFethItems = () => {
    this.setState({ loading: true });
    axios
      .get(productListUrl)
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };
  render() {
    const { data, loading, error } = this.state;
    return (
      <Container text style={{ marginTop: "5em" }}>
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            list={JSON.stringify(error)}
          />
        )}
        {data &&
          data.map((item) => {
            return (
              <Item.Group divided key={item.id}>
                <Item>
                  <Item.Image src={item.image} />
                  <Item.Content>
                    <Link to={`product/${item.id}`}>
                      <Item.Header>{item.title}</Item.Header>
                    </Link>
                    <Item.Meta>
                      <span className="cinema">${item.discount_price}</span>
                    </Item.Meta>
                    <Item.Description>{item.description}</Item.Description>
                    <Item.Extra>
                      <Label>{item.category}</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            );
          })}
      </Container>
    );
  }
}

export default Home;
