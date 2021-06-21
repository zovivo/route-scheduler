import React, { useState, useEffect, Component } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInput,
    CButton,
    CInputGroupAppend,
    CContainer,
    CButtonGroup,
    CToastBody,
    CToastHeader,
    CToast,
    CToaster,
    CModalHeader,
    CModalTitle,
    CModal,
    CModalBody,
    CFormGroup,
    CLabel,
    CModalFooter,
} from '@coreui/react'

import { customersData } from '../../users/UsersData'
import CIcon from '@coreui/icons-react'
import customerService from '../../../service/CustomerService';
import { convertTime, secondsToHHMMSS } from '../../../service/utility'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'


class Customers extends Component {

    state = {
        currentPage: 1,
        pageSize: 5,
        customersData: null,
        totalPages: 0,
        totalCustomers: 0,
        search: {},
        showAdd: false,
        showEdit: false,
        showDelete: false,
        editCustomer: {},
        showSuccessMsg: false,
        deleteCustomer: {},
    };

    processCustomersData = (customersData) => {
        customersData.map((customer, index) => {
            customer.startTimeStr = secondsToHHMMSS(customer.startTime);
            customer.endTimeStr = secondsToHHMMSS(customer.endTime);
            customer.index = this.state.pageSize * (this.state.currentPage - 1) + index + 1;
        });
        return customersData;
    }

    onPageChanged = (page) => {
        let search = this.state.search;
        search.page = page > 0 ? page : 1;
        search.pageSize = this.state.pageSize;
        this.setState({ search: search });
        this.search(this.state.search);
    };

    reloadData = () => {
        this.search(this.state.search);
    }

    handleEdit = (editCustomer) => {
        const editingCustomer = {
            id: editCustomer.id,
            code: editCustomer.code,
            name: editCustomer.name,
            address: editCustomer.address,
            latitude: editCustomer.latitude,
            longitude: editCustomer.longitude,
            startTime: editCustomer.startTime,
            endTime: editCustomer.endTime,
            penaltyCost: editCustomer.penaltyCost,
        }
        this.setState({
            editCustomer: editingCustomer,
            showEdit: true,
        });
    }

    showDeleteModal = (deleteCustomer) => {
        this.setState({
            showDelete: true,
            deleteCustomer: deleteCustomer,
        });
    }

    setShowDelete = (showDelete) => {
        this.setState({
            showDelete: showDelete
        })
    }

    handleDetail = (detailCustomer) => {
        const { history } = this.props;
        history.push({
            pathname: '/customers/detail',
            search: 'id=' + detailCustomer.id,
            state: { id: detailCustomer.id }
        });
    }

    handleDelete = () => {
        const idCustomer = this.state.deleteCustomer.id;
        customerService.delete(idCustomer).then(response => {
            const data = response.data;
            if (data.code === 'SUCCESS') {
                this.showSuccessMsg("Delete customer " + this.state.deleteCustomer.code + " successfully!");
                this.setShowDelete(false);
                this.reloadData();
            }

        })
    }

    handleSearch = () => {
        let search = this.state.search;
        search.page = 1;
        search.pageSize = 5;
        this.setState({ search: search });
        this.search(this.state.search);
    }

    handleSearchNameChange = (event) => {
        let value = event.target.value;
        let search = this.state.search;
        search.name = value;
        this.setState({ search: search });
    }

    setShowAdd = (showAdd) => {
        this.setState({
            showAdd: showAdd
        })
    }

    setShowEdit = (showEdit) => {
        this.setState({
            showEdit: showEdit
        })
    }
    showSuccessMsg = (msg) => {
        this.setState({
            showSuccessMsg: true,
            successMsg: msg,
        })
    }

    setShowSuccessToast = (show) => {
        this.setState({
            showSuccessMsg: show === true ? true : false,
        })
    }

    search(search) {
        customerService.search(search).then(response => {
            const data = response.data.data;
            this.setState({
                customersData: data.content,
                currentPage: data.pageable.pageNumber + 1,
                pageSize: data.pageable.pageSize,
                totalPages: data.totalPages,
                totalCustomers: data.totalElements,
                editCustomer: {},
            });
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        let {
            currentPage,
            pageSize,
            customersData,
            totalPages,
            totalCustomers,
        } = this.state;
        if ((customersData != null) && customersData.length > 0)
            customersData = this.processCustomersData(customersData);
        return (
            <CContainer>
                <CRow>
                    <CCol sm='6'>
                        <CCard>
                            <CModal
                                show={this.state.showDelete}
                                onClose={() => this.setShowDelete(false)}
                                color="danger"
                            >
                                <CModalHeader closeButton>
                                    <CModalTitle>Delete Customer</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CCard>
                                        <CCardHeader>
                                            Confirm Delete Customer
                                        </CCardHeader>
                                        <CCardBody>
                                            {"Delete customer " + this.state.deleteCustomer.code + " may affect other data. Do you really want to delete?"}
                                        </CCardBody>
                                    </CCard>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="success" onClick={() => this.handleDelete()}>Confirm</CButton>{' '}
                                    <CButton color="secondary" onClick={() => this.setShowDelete(false)}>Cancel</CButton>
                                </CModalFooter>
                            </CModal>
                            <CCol sm="12" lg="6">
                                <CToaster position='top-right'>
                                    <CToast
                                        key={'toastSuccess'}
                                        show={this.state.showSuccessMsg}
                                        autohide={4000}
                                        fade={true}
                                        onStateChange={(show) => { this.setShowSuccessToast(show) }}
                                    >
                                        <CToastHeader closeButton>Notification</CToastHeader>
                                        <CToastBody>
                                            {this.state.successMsg}
                                        </CToastBody>
                                    </CToast>
                                </CToaster>
                            </CCol>
                            <AddCustomer setShowAdd={this.setShowAdd} show={this.state.showAdd} reloadData={this.reloadData} />
                            {this.state.showEdit &&
                                <EditCustomer editCustomer={this.state.editCustomer} setShowEdit={this.setShowEdit} reloadData={this.reloadData} showSuccessMsg={this.showSuccessMsg} />
                            }
                            <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                    <CInputGroupText>
                                        <CIcon name="cil-magnifying-glass" />
                                    </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput size="2" type="text" placeholder="Search by name" value={this.state.search.name} onChange={this.handleSearchNameChange} />
                                <CInputGroupAppend>
                                    <CButton color="info" onClick={this.handleSearch}>Search</CButton>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCard>
                    </CCol>
                    <CCol sm='2'>
                        <CCard>
                            <CButton type="submit" size="md" color="success" onClick={() => this.setShowAdd(true)}><CIcon name="cil-scrubber" /> Add</CButton>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol >
                        <CCard>
                            <CCardHeader>
                                Customers Info
                                    <small className="text-muted"> {totalPages} pages</small>
                                <small className="text-muted"> {totalCustomers} Customers</small>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={customersData}
                                    fields={[
                                        { key: 'index', label: 'STT' },
                                        { key: 'name', _classes: 'font-weight-bold', label: 'Tên khách hàng' },
                                        { key: 'code', label: 'Mã khách hàng' },
                                        { key: 'longitude', label: 'Kinh độ' },
                                        { key: 'latitude', label: 'Vĩ độ' },
                                        { key: 'address', label: 'Địa chỉ' },
                                        { key: 'startTimeStr', label: 'Thời điểm mở cửa' },
                                        { key: 'endTimeStr', label: 'Thời điểm đóng cửa' },
                                        {
                                            key: 'actions',
                                            label: 'Thao tác',
                                        }

                                    ]}
                                    hover
                                    striped
                                    bordered
                                    size="lg"
                                    // itemsPerPageSelect
                                    itemsPerPage={pageSize}
                                    // activePage={currentPage}
                                    // clickableRows
                                    scopedSlots={{
                                        'actions':
                                            (item, index) => {
                                                return (
                                                    <td className="py-2">
                                                        <CButtonGroup>
                                                            <CButton variant="ghost" color="info" shape="pill" size="sm"
                                                                onClick={() => { this.handleDetail(item) }}
                                                            >Detail
                                                            </CButton>
                                                            <CButton variant="ghost" color="warning" shape="pill" size="sm"
                                                                onClick={() => { this.handleEdit(item) }}
                                                            >Edit
                                                            </CButton>
                                                            <CButton variant="ghost" color="danger" shape="pill" size="sm"
                                                                onClick={() => { this.showDeleteModal(item) }}
                                                            >Delete
                                                            </CButton>

                                                        </CButtonGroup>
                                                    </td>
                                                )
                                            },
                                    }}

                                />
                                <CPagination
                                    activePage={currentPage}
                                    onActivePageChange={(page) => this.onPageChanged(page)}
                                    pages={totalPages}
                                    doubleArrows={true}
                                    align="center"
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        )

    }
}
export default Customers
