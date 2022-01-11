import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Grid,
  Icon,
  Image,
  Item,
  Label,
  Dimmer,
  Loader,
  Message,
  Segment,
  Form,
  Divider,
  Select,
} from "semantic-ui-react";
import { productDetailUrl, addToCartUrl } from "../Constants";
import { authAxios } from "../utils";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ProductDetail extends Component {
  state = {
    loading: false,
    error: null,
    data: [],
    formVisible: false,
    formData: {},
  };
  componentDidMount() {
    this.handleFethItem();
  }
  handleToggleForm = () => {
    const { formVisible } = this.state;
    this.setState({
      formVisible: !formVisible,
    });
  };
  handleChange = (e, { name, value }) => {
    const { formData } = this.state;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    this.setState({
      formData: updatedFormData,
    });
  };

  handleFormatData = (formData) => {
    return Object.keys(formData).map((key) => {
      return formData[key];
    });
  };
  handleAddToCart = (slug) => {
    const { formData } = this.state;
    const variations = this.handleFormatData(formData);
    {
      this.props.authenticated
        ? authAxios
            .post(addToCartUrl, { slug, variations })
            .then((res) => {
              this.setState({ loading: false });
            })
            .catch((err) => {
              this.setState({ error: err, loading: false });
            })
        : window.location.replace("/login");
    }
  };

  handleFethItem = () => {
    const {
      match: { params },
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(productDetailUrl(params.id))
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };
  render() {
    const { data, loading, error, formVisible, formData } = this.state;
    const item = data;
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
            header="There was an error"
            list={[JSON.stringify(error)]}
          />
        )}
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Card
                image={item.image}
                header={item.title}
                meta={item.discount_price}
                description={item.description}
                extra={
                  <Item.Extra>
                    <Button
                      onClick={this.handleToggleForm}
                      icon
                      labelPosition="right"
                      fluid
                      primary
                      floated="right"
                    >
                      Add to cart
                      <Icon name="cart plus" />
                    </Button>
                  </Item.Extra>
                }
              />
              {formVisible && (
                <React.Fragment>
                  <Divider />
                  <Form>
                    <Form.Field>
                      {data.variations.map((v) => {
                        const name = v.name.toLowerCase();
                        return (
                          <Select
                            key={v.id}
                            name={name}
                            onChange={this.handleChange}
                            options={v.item_variations.map((item) => {
                              return {
                                key: item.id,
                                text: item.value,
                                value: item.id,
                              };
                            })}
                            placeholder={`Choose a ${name}`}
                            selection
                            value={formData[name]}
                          />
                        );
                      })}
                    </Form.Field>
                    <Form.Button
                      fluid
                      primary
                      onClick={() => {
                        this.handleAddToCart(item.slug);
                      }}
                    >
                      Add
                    </Form.Button>
                  </Form>
                </React.Fragment>
              )}
            </Grid.Column>
            <Grid.Column>
              {data.variations &&
                data.variations.map((v) => {
                  return (
                    <Item.Group relaxed="very" key={v.id}>
                      {v.item_variations.map((iv) => {
                        return (
                          <Item key={iv.id}>
                            {iv.attachment && (
                              <Item.Image
                                size="tiny"
                                src={`http://127.0.0.1:8000${iv.attachment}`}
                              />
                            )}
                            <Item.Content verticalAlign="middle">
                              <Item.Header as="a">{iv.value}</Item.Header>
                            </Item.Content>
                          </Item>
                        );
                      })}
                    </Item.Group>
                  );
                })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.token !== null,
  };
};

export default connect(mapStateToProps)(ProductDetail);
