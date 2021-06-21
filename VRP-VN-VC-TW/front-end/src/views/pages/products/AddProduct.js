import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToast,
    CSelect,
} from '@coreui/react';
import React, { Component } from 'react'
import productService from '../../../service/ProductService';
import { listProductCategory } from '../../../service/utility'
import MultiSelect from "@khanacademy/react-multi-select";


class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: '',
            categoryCode: listProductCategory[0].code,
            weight: '',
            capacity: '',
            length: '',
            width: '',
            height: '',
            productCategories: listProductCategory,
            excludingProducts: [],
        };

    }

    componentDidMount() {
        let search = { paged: false };
        productService.search(search).then(response => {
            let productsData = response.data.data;
            productsData = productsData.map((product, index) => {
                return ({
                    label: product.name + " - " + product.code,
                    value: product,
                });
            })
            this.setState({ products: productsData })
        }).catch(e => {
            console.log(e);
        });

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleChangeExcludeProduct = (excludeProducts) => {
        this.setState({ excludingProducts: excludeProducts });
    }

    setShowToast = (showToast) => {
        this.setState({
            showToast: showToast
        });
    }

    handleSubmit = () => {
        console.log(this.state)
        let productData = {
            name: this.state.name,
            price: parseFloat(this.state.price),
            weight: parseFloat(this.state.weight),
            length: parseFloat(this.state.length),
            width: parseFloat(this.state.width),
            height: parseFloat(this.state.height),
            capacity: Math.round(parseFloat(this.state.length * this.state.width * this.state.height) * 100) / 100,
            category: this.state.categoryCode,
            excludingProducts: this.state.excludingProducts,
        }
        productService.create(productData).then(response => {
            const data = response.data;
            if (data.code === 'SUCCESS') {
                this.props.setShowAdd(false);
                this.props.showSuccessMsg("Add product " + data.data.code + " successfully");
                this.props.reloadData();
            }

        })
    }


    render() {
        const productCategories = this.state.productCategories;
        return (
            <CCol>
                <CModal
                    show={true}
                    onClose={() => this.props.setShowAdd(false)}
                    color="success"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Create Product</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CCard>
                            <CCardHeader>
                                Product Form
                                        </CCardHeader>
                            <CCardBody>
                                <CFormGroup>
                                    <CLabel htmlFor="productName">Name</CLabel>
                                    <CInput id="productName" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter your product name" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="category">Category</CLabel>
                                    <CSelect custom size="md" name="categoryCode" id="category" value={this.state.categoryCode} onChange={this.handleInputChange}>
                                        {productCategories.map((category, index) => <option key={index} value={category.code}>{category.description}</option>)}
                                    </CSelect>
                                </CFormGroup>
                                <CFormGroup row className="my-0">
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="price">Price(VND)</CLabel>
                                            <CInput id="price" name="price" value={this.state.price} onChange={this.handleInputChange} placeholder="price" type='number' />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="weight">Weight(kg)</CLabel>
                                            <CInput id="weight" name="weight" value={this.state.weight} onChange={this.handleInputChange} placeholder="weight" type='number' step="0.1" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row className="my-0">
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="length">Length(m)</CLabel>
                                            <CInput id="length" name="length" value={this.state.length} onChange={this.handleInputChange} placeholder="length" type='number' step="0.01" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="width">width(m)</CLabel>
                                            <CInput id="width" name="width" value={this.state.width} onChange={this.handleInputChange} placeholder="width" type='number' step="0.01" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="height">height(m)</CLabel>
                                            <CInput id="height" name="height" value={this.state.height} onChange={this.handleInputChange} placeholder="height" type='number' step="0.01" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="excludingProducts">Excluding Products</CLabel>
                                    {this.state.products &&
                                        <MultiSelect
                                            options={this.state.products}
                                            selected={this.state.excludingProducts}
                                            onSelectedChanged={selected => this.handleChangeExcludeProduct(selected)}
                                        />
                                    }
                                </CFormGroup>
                            </CCardBody>
                        </CCard>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="success" onClick={() => this.handleSubmit()}>Submit</CButton>{' '}
                        <CButton color="secondary" onClick={() => this.props.setShowAdd(false)}>Cancel</CButton>
                    </CModalFooter>
                </CModal>
            </CCol>
        );
    }

}

export default AddProduct;
