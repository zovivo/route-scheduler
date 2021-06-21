import React, { useState, useEffect, Component } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
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
    CBadge,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import solutionRoutingService from '../../../../service/RouteService';
import { getFormatDate } from '../../../../service/utility'

class SolutionRoutings extends Component {

    state = {
        currentPage: 1,
        pageSize: 5,
        solutionRoutingsData: null,
        totalPages: 0,
        totalSolutionRoutings: 0,
        search: {},
        showEdit: false,
        showDelete: false,
        editSolutionRouting: {},
        showSuccessMsg: false,
        deleteSolutionRouting: {},
        searchName: "",
        searchDate:'',
    };

    processSolutionRoutingsData = (solutionRoutingsData) => {
        solutionRoutingsData.map((solutionRouting, index) => {
            solutionRouting.index = this.state.pageSize * (this.state.currentPage - 1) + index + 1;
        });
        return solutionRoutingsData;
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

    handleDetail = (solutionRouting) => {
        const { history } = this.props;
        history.push({
            pathname: '/routes/solutions/tracking',
            search: 'id=' + solutionRouting.id,
            state: { id: solutionRouting.id }
        });
    }

    handleEdit = (editSolutionRouting) => {
        const editingSolutionRouting = {
            id: editSolutionRouting.id,
            code: editSolutionRouting.code,
            depot: editSolutionRouting.depot,
            customer: editSolutionRouting.customer,
            deliveryMode: editSolutionRouting.deliveryMode,
            solutionRoutingItems: editSolutionRouting.solutionRoutingItems,
            solutionRoutingValue: editSolutionRouting.solutionRoutingValue,
            deliveryBeforeTime: editSolutionRouting.deliveryBeforeTime,
            deliveryAfterTime: editSolutionRouting.deliveryAfterTime,
            productTypeNumber: editSolutionRouting.productTypeNumber,
            timeService: editSolutionRouting.timeService,
            weight: editSolutionRouting.weight,
            capacity: editSolutionRouting.capacity,
        }
        this.setState({
            editSolutionRouting: editingSolutionRouting,
            showEdit: true,
        });
    }

    showDeleteModal = (deleteSolutionRouting) => {
        this.setState({
            showDelete: true,
            deleteSolutionRouting: deleteSolutionRouting,
        });
    }

    setShowDelete = (showDelete) => {
        this.setState({
            showDelete: showDelete
        })
    }

    handleDelete = () => {
        const idSolutionRouting = this.state.deleteSolutionRouting.id;
        solutionRoutingService.delete(idSolutionRouting).then(response => {
            const data = response.data;
            if (data.code === 'SUCCESS') {
                this.showSuccessMsg("Delete solutionRouting " + this.state.deleteSolutionRouting.code + " successfully!");
                this.setShowDelete(false);
                this.reloadData();
            }

        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }

    handleSearch = () => {
        let search = {
            name: this.state.searchName,
            intendReceiveTime: this.state.searchDate === null ? null : new Date(this.state.searchDate).getTime(),
            page: 1,
            pageSize: 5,
        }
        this.setState({ search: search });
        this.search(search);
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
        solutionRoutingService.searchSolution(search).then(response => {
            const data = response.data.data;
            this.setState({
                solutionRoutingsData: data.content,
                currentPage: data.pageable.pageNumber + 1,
                pageSize: data.pageable.pageSize,
                totalPages: data.totalPages,
                totalSolutionRoutings: data.totalElements,
                editSolutionRouting: {},
            });
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        let {
            currentPage,
            pageSize,
            solutionRoutingsData,
            totalPages,
            totalSolutionRoutings,
        } = this.state;
        if ((solutionRoutingsData != null) && solutionRoutingsData.length > 0)
            solutionRoutingsData = this.processSolutionRoutingsData(solutionRoutingsData);
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
                                    <CModalTitle>Delete SolutionRouting</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CCard>
                                        <CCardHeader>
                                            Confirm Delete SolutionRouting
                                        </CCardHeader>
                                        <CCardBody>
                                            {"Delete solutionRouting " + this.state.deleteSolutionRouting.code + " may affect other data. Do you really want to delete?"}
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
                            {/* {this.state.showAdd &&
                                <AddSolutionRouting setShowAdd={this.setShowAdd} reloadData={this.reloadData} showSuccessMsg={this.showSuccessMsg} />
                            }
                            {this.state.showEdit &&
                                <EditSolutionRouting editSolutionRouting={this.state.editSolutionRouting} setShowEdit={this.setShowEdit} reloadData={this.reloadData} showSuccessMsg={this.showSuccessMsg} />
                            } */}
                            <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                    <CInputGroupText>
                                        <CIcon name="cil-magnifying-glass" />
                                    </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput size="2" type="text" id="searchName" name="searchName" placeholder="Search by name" value={this.state.searchName} onChange={this.handleInputChange} />
                                &nbsp;
                                <CInput size="1" type="date" id="searchDate" name="searchDate" placeholder="date" onChange={this.handleInputChange} />

                                <CInputGroupAppend>
                                    <CButton color="info" onClick={this.handleSearch}>Search</CButton>
                                </CInputGroupAppend>
                            </CInputGroup>
                            {/* <CRow>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CLabel htmlFor="searchName">name</CLabel>
                                        <CInput type="text" id="searchName" name="searchName" placeholder="Search by name" value={this.state.search.name} onChange={this.handleInputChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CLabel htmlFor="searchDate">intendTime</CLabel>
                                        <CInput size="1" type="date" id="searchDate" name="searchDate" placeholder="date" onChange={this.handleInputChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CButton color="info" onClick={this.handleSearch}>Search</CButton>
                                    </CFormGroup>
                                </CCol>
                            </CRow> */}
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol >
                        <CCard>
                            <CCardHeader>
                                SolutionRoutings Info
                                    <small className="text-muted"> {totalPages} pages</small>
                                <small className="text-muted"> {totalSolutionRoutings} SolutionRoutings</small>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={solutionRoutingsData}
                                    fields={[
                                        { key: 'index', label: 'STT' },
                                        { key: 'id', label: 'Mã Lộ trình' },
                                        { key: 'name', label: 'Tên lộ trình' },
                                        { key: 'efficiency', label: 'Hiệu suất' },
                                        { key: 'revenue', label: 'Doanh thu' },
                                        { key: 'numberVehicle', label: 'Số lượng xe' },
                                        { key: 'totalCost', label: 'Tổng chi phí' },
                                        { key: 'intendReceiveTime', label: 'Ngày giao dự kiến' },
                                        { key: 'actions', label: 'Thao tác', }

                                    ]}
                                    hover
                                    striped
                                    bordered
                                    size="lg"
                                    itemsPerPage={pageSize}
                                    scopedSlots={
                                        {
                                            'efficiency':
                                                (item) => {
                                                    return (
                                                        <td className="py-2">
                                                            <span>{item.solution.efficiency + " %"} </span>
                                                        </td>
                                                    )
                                                },

                                            'revenue':
                                                (item) => {
                                                    return (
                                                        <td className="py-2">
                                                            <span>{item.solution.revenue + " VND"}</span>
                                                        </td>
                                                    )
                                                },

                                            'numberVehicle':
                                                (item) => {
                                                    return (
                                                        <td className="py-2">
                                                            <span>{item.solution.numberVehicle}</span>
                                                        </td>
                                                    )
                                                },

                                            'totalCost':
                                                (item) => {
                                                    return (
                                                        <td className="py-2">
                                                            <span>{item.solution.totalCost + " VND"}</span>
                                                        </td>
                                                    )
                                                },

                                            'intendReceiveTime':
                                                (item) => {
                                                    return (
                                                        <td className="py-2">
                                                            <span>{getFormatDate(item.intendReceiveTime)} </span>
                                                        </td>
                                                    )
                                                },

                                            'actions':
                                                (item, index) => {
                                                    return (
                                                        <td className="py-2">
                                                            <CButtonGroup>
                                                                <CButton variant="ghost" color="info" shape="pill" size="sm"
                                                                    onClick={() => { this.handleDetail(item) }}
                                                                >View
                                                                </CButton>
                                                                <CButton variant="ghost" color="warning" shape="pill" size="sm"
                                                                    onClick={() => { this.handleEdit(item) }}
                                                                >Edit
                                                                </CButton>
                                                                <CButton variant="ghost" color="danger" shape="pill" size="sm"
                                                                    onClick={() => { this.showDeleteModal(item) }}
                                                                >Detail Config
                                                                </CButton>
                                                            </CButtonGroup>
                                                        </td>
                                                    )
                                                },
                                        }
                                    }

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
export default SolutionRoutings
