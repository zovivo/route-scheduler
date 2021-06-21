import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToast,
    CToastBody,
    CToastHeader,
    CToaster,
} from '@coreui/react';
import React, { Component } from 'react'
import customerService from '../../service/CustomerService';
import { hhmmToSeconds } from '../../utilities/utility'

class AddCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show,
            name: '',
            address: '',
            latitude: '',
            longitude: '',
            startTime: '',
            endTime: '',
            penaltyCost: '',
            showToast: false,
        };

    }

    handleChangeName = (e) => {
        this.setState({ name: e.target.value });
    }

    handleChangeAddress = (e) => {
        this.setState({ address: e.target.value });
    }
    handleChangeLatitude = (e) => {
        this.setState({ latitude: e.target.value });
    }
    handleChangeLongitude = (e) => {
        this.setState({ longitude: e.target.value });
    }
    handleChangeStartTime = (e) => {
        this.setState({ startTime: e.target.value });
    }
    handleChangeEndTime = (e) => {
        this.setState({ endTime: e.target.value });
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    setShowToast = (showToast) => {
        this.setState({
            showToast: showToast
        });
    }

    handleSubmit = () => {
        console.log(this.state)
        let customerData = {
            name: this.state.name,
            address: this.state.address,
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            startTime: hhmmToSeconds(this.state.startTime),
            endTime: hhmmToSeconds(this.state.endTime),
            penaltyCost: this.state.penaltyCost,
        }
        customerService.create(customerData).then(response => {
            const data = response.data;
            if (data.code === 'SUCCESS') {
                this.props.setShowAdd(false);
                this.setState({
                    msg: ("Add customer " + data.data.name + " successfully"),
                    showToast: true
                });
                this.props.reloadData();
            }

        })
    }


    render() {
        const show = this.props.show;
        return (
            <CCol>
                <CCol sm="12" lg="6">
                    <CToaster position='top-right'>
                        <CToast
                            key={'toastSuccess'}
                            show={this.state.showToast}
                            autohide={4000}
                            fade={true}
                            onStateChange={(showToast) => { this.setShowToast(showToast) }}
                        >
                            <CToastHeader closeButton>Notification</CToastHeader>
                            <CToastBody>
                                {this.state.msg}
                            </CToastBody>
                        </CToast>
                    </CToaster>
                </CCol>
                <CModal
                    show={show}
                    onClose={() => this.props.setShowAdd(!this.props.show)}
                    color="success"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Create Customer</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CCard>
                            <CCardHeader>
                                Customer Form
                                        </CCardHeader>
                            <CCardBody>
                                <CFormGroup>
                                    <CLabel htmlFor="customerName">Name</CLabel>
                                    <CInput id="customerName" value={this.state.name} onChange={this.handleChangeName} placeholder="Enter your customer name" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="address">Address</CLabel>
                                    <CInput id="address" value={this.state.address} onChange={this.handleChangeAddress} placeholder="Enter your customer address" type='String' />
                                </CFormGroup>
                                <CFormGroup row className="my-0">
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="latitude">Latitude</CLabel>
                                            <CInput id="latitude" value={this.state.latitude} onChange={this.handleChangeLatitude} placeholder="latitude" type='String' />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="longitude">Longitude</CLabel>
                                            <CInput id="longitude" value={this.state.longitude} onChange={this.handleChangeLongitude} placeholder="longitude" type='String' />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row className="my-0">
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="startTime">Start Time</CLabel>
                                            <CInput type="time" id="startTime" value={this.state.startTime} onChange={this.handleChangeStartTime} placeholder="Enter customer startTime" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="endTime">End Time</CLabel>
                                            <CInput type="time" id="endTime" value={this.state.endTime} onChange={this.handleChangeEndTime} placeholder="Enter customer endTime" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="penaltyCost">penaltyCost</CLabel>
                                    <CInput id="penaltyCost" name="penaltyCost" value={this.state.penaltyCost} onChange={this.handleInputChange} placeholder="Enter your depot penaltyCost" type='number' />
                                </CFormGroup>
                            </CCardBody>
                        </CCard>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="success" onClick={() => this.handleSubmit()}>Submit</CButton>{' '}
                        <CButton color="secondary" onClick={() => this.props.setShowAdd(!this.props.show)}>Cancel</CButton>
                    </CModalFooter>
                </CModal>
            </CCol>
        );
    }

}

export default AddCustomer;
