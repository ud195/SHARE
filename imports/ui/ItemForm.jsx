import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import FormData from 'form-data';
import { ItemCollection } from '../collections/items.js';
import { Grid, Container, TextArea, Modal, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment } from 'semantic-ui-react'
import { Session } from 'meteor/session';

export default class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: '',
            description: '',
            price: '',
            owner: Session.get('user').username,
            condition: '',
            category: 'Select an item category',
            uploadedFile: '',
            uploadedFileCloudinaryUrl: "",
            droppedImage: '',
            status: 'Unknown',
            borrowed: false,
            rating: 0,
            location: ''

        };
    }

    
    render() {
        let { uploadedFile, error, uploadedFileCloudinaryUrl, droppedImage, name, description, price, owner, condition, status, borrowed, rating, category, location } = this.state;
         console.log("form item..", this.state.description);

        return (
            <div>
                {owner ?
                    <Container text>
                        <Segment inverted color='green' padded="very">
                            <Header as='h3'>
                                <Icon.Group size='large'>
                                    <Icon name='database' />
                                    <Icon corner name='add' />
                                </Icon.Group>
                                Upload Item
                        </Header>

                            <Segment.Group>
                                <Segment compact raised >
                                    <Form size='small'>
                                        <Form.Field>
                                            <Header as='h4' block>Item Name</Header>
                                            <Input type="text" placeholder="Item Name" 
                                            value={this.state.name} 
                                            onChange={this.onNameChange.bind(this)} />
                                        </Form.Field>

                                        <Header as='h4' block>Attach an image *</Header>
                                        <Segment >
                                            <Grid>
                                                <Grid.Row columns={2}>
                                                    <Grid.Column>

                                                        <Dropzone
                                                            onDrop={this.onImageDrop.bind(this)}
                                                            multiple={false}
                                                            accept="image/*">
                                                            <div>Drop an image or click to select a file to upload.</div>
                                                        </Dropzone>

                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                                            <Image src={this.state.uploadedFileCloudinaryUrl} />}
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>


                                        <Form.Field>
                                            <Header as='h4' block>Description</Header>
                                            <TextArea placeholder='Enter short description about item.' autoHeight 
                                            value={this.state.description}
                                            onChange={this.onDescriptionChange.bind(this)} />
                                        </Form.Field>

                                            <Form.Field>
                                        <label>Item Condition</label>
                                        <select 
                                        value={this.state.condition} 
                                        onChange={this.onConditionChange.bind(this)}>
                                            <option value='new'>New</option>
                                            <option value='used'>Used</option>
                                            <option value='working'>Working</option>
                                            <option value='partly-working'>Partly Working</option>
                                        </select>
                                        </Form.Field>

                                        <Form.Field>
                                            <Header as='h4' block>Price</Header>
                                            <Input type="text" placeholder="Price" 
                                            value={this.state.price} 
                                            onChange={this.onPriceChange.bind(this)} />
                                        </Form.Field>

                                        <Form.Field>
                                        <label>Item Category</label>
                                        <select 
                                        value={this.state.category} 
                                        onChange={this.onCategoryChange.bind(this)} >
                                            <option value='Un-Categorised'>Un-Categorised</option>
                                            <option value='Clothing'>Clothing</option>
                                            <option value='Electronics'>Electronics</option>
                                            <option value='Appliances'>Appliances</option>
                                            <option value='Gardening'>Gardening</option>
                                            <option value='Furnitures'>Furnitures</option>
                                            <option value='Motors'>Motors</option>
                                        </select>
                                        </Form.Field>

                                        <Form.Field>
                                        <label>Item Location</label>
                                        <Input icon="compass" placeholder='Enter Item Location' type="text" 
                                        value={this.state.location} 
                                        onChange={this.onLocationChange.bind(this)} />
                                        </Form.Field>

                                        <Button icon='save' color='blue' content='Update' onClick={this.onSubmit.bind(this)} />
                                    </Form>
                                </Segment>
                            </Segment.Group>
                        </Segment>
                    </Container>
                    :
                    <p>error</p>
                }
            </div>
        );
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        console.log("file>> ", files[0]);
        this.handleImageUpload(files[0]);
    }

    onNameChange(e) {
        this.setState({ name: e.target.value });
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    onConditionChange(e) {
        this.setState({ condition: e.target.value });
    }

    onPriceChange(e) {
        this.setState({ price: e.target.value });
    }

    onCategoryChange(e) { 
        this.setState({ category: e.target.value }); 
    }

    onLocationChange(e) { 
        this.setState({ location: e.target.value });  
    }


    onSubmit(e) {
        e.preventDefault();
        console.log("submited..", this.state);
        let item = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            owner: Session.get('user').username,
            condition: this.state.condition,
            status : this.state.status,
            borrowed : this.state.borrowed,
            rating : this.state.rating,
            category : this.state.category,
            location : this.state.location,
            imageUrl: this.state.uploadedFileCloudinaryUrl
        }
        this.handleImageUpload(this.state.uploadedFile);
        let imageUrl = this.state.uploadedFileCloudinaryUrl;
        ItemCollection.insert( {imageUrl : item.imageUrl, name : item.name, description : item.description, price : item.price, 
            owner : item.owner, condition : item.condition, status : item.status, borrowed : item.borrowed,
             rating : item.rating, category : item.category, location : item.location});
    }

    componentWillMount()
    {
        console.log("Will mount : ");
        console.log("props (will mount) > "+ this.props);
        console.log("state (will Mount) > "+ this.state.description);

    }

    componentDidMount()
    {
        //console.log("Did mount :"+ description);
        console.log("props (did Mount) > "+ this.props);    
        console.log("state (did Mount) > "+ this.state.description);
    }

    handleImageUpload(file) {
        console.log("upload img..", this.state);
        const CLOUDINARY_UPLOAD_PRESET = 'rudree_cloud';
        const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/rudree/upload';
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        data.append('folder', 'items');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', CLOUDINARY_UPLOAD_URL, false);
        xhr.send(data);
        const imageResponse = JSON.parse(xhr.responseText);
        if ((imageResponse.secure_url !== '') && (this.state.user !== null)) {
            console.log(imageResponse);
            this.setState({
                uploadedFileCloudinaryUrl: imageResponse.secure_url
            });
            this.setState({
                droppedImage: imageResponse.secure_url
            });
        }
    }



}
