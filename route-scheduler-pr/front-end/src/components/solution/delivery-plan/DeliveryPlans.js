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
    CSelect,
    CListGroupItem,
    CListGroup,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import deliveryPlanService from '../../../service/SolutionRouteService';
import { getFormatDate } from '../../../utilities/utility'

class DeliveryPlans extends Component {

    state = {
        currentPage: 1,
        pageSize: 5,
        deliveryPlansData: null,
        totalPages: 0,
        totalDeliveryPlans: 0,
        search: {},
        showEdit: false,
        showCompare: false,
        editDeliveryPlan: {},
        showSuccessMsg: false,
        deleteDeliveryPlan: {},
        searchName: "",
        searchDate: '',
        toComparedDeliveryPlan: {},
    };

    processDeliveryPlansData = (deliveryPlansData) => {
        deliveryPlansData.map((deliveryPlan, index) => {
            deliveryPlan.index = this.state.pageSize * (this.state.currentPage - 1) + index + 1;
        });
        return deliveryPlansData;
    }

    handleWithSolution = (withSolutionId) => {
        this.setState({
            toComparedDeliveryPlan: this.state.compareDeliveryPlans.find(deliveryPlan => deliveryPlan.id === withSolutionId)
        });
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

    handleDetail = (deliveryPlan) => {
        const { history } = this.props;
        history.push({
            pathname: '/routes/solutions/tracking',
            search: 'id=' + deliveryPlan.id,
            state: { id: deliveryPlan.id }
        });
    }

    showCompareModal = (compareDeliveryPlan) => {
        let compareDeliveryPlans = this.state.deliveryPlansData.filter(deliveryPlan => deliveryPlan.id !== compareDeliveryPlan.id);
        this.setState({
            showCompare: true,
            compareDeliveryPlan: compareDeliveryPlan,
            toComparedDeliveryPlan: compareDeliveryPlans[0],
            compareDeliveryPlans: compareDeliveryPlans,
        });
    }

    hideCompare = () => {
        this.setState({
            showCompare: false,
            compareDeliveryPlan: undefined,
            toComparedDeliveryPlan: undefined,
            isComparingPlan: undefined,
            toComparingPlan: undefined,
        })
    }

    handleCompareToPlan = () => {
        let isComparingPlan = this.state.compareDeliveryPlan;
        let toComparingPlan = this.state.toComparedDeliveryPlan;
        isComparingPlan.solution.totalPenaltyCost = this.calculatePenaltyCost(isComparingPlan.solution);
        toComparingPlan.solution.totalPenaltyCost = this.calculatePenaltyCost(toComparingPlan.solution);
        this.setState({
            isComparingPlan: isComparingPlan,
            toComparingPlan: toComparingPlan,
        });
    }

    calculatePenaltyCost = (solution) => {
        let totalPenaltyCost = 0;
        solution.journeys.map(journey => {
            totalPenaltyCost += journey.totalPenaltyCost;
        })
        return totalPenaltyCost;
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
        deliveryPlanService.searchSolution(search).then(response => {
            const data = response.data.data;
            this.setState({
                deliveryPlansData: data.content,
                compareDeliveryPlans: data.content,
                currentPage: data.pageable.pageNumber + 1,
                pageSize: data.pageable.pageSize,
                totalPages: data.totalPages,
                totalDeliveryPlans: data.totalElements,
                editDeliveryPlan: {},
            });
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        let {
            currentPage,
            pageSize,
            deliveryPlansData,
            totalPages,
            totalDeliveryPlans,
        } = this.state;
        if ((deliveryPlansData != null) && deliveryPlansData.length > 0)
            deliveryPlansData = this.processDeliveryPlansData(deliveryPlansData);
        return (
            <CContainer>
                <CRow>
                    <CCol sm='6'>
                        <CCard>
                            {this.state.compareDeliveryPlan &&
                                <CModal
                                    show={this.state.showCompare}
                                    onClose={() => this.hideCompare()}
                                    color="success"
                                    size="lg"
                                >
                                    <CModalHeader closeButton>
                                        <CModalTitle>
                                            So s??nh l??? tr??nh
                                        </CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CCard>
                                            <CCardHeader>
                                                <CFormGroup row className="my-0">
                                                    <CCol md="3">
                                                        <CLabel htmlFor="plan">So s??nh v???i l??? tr??nh</CLabel>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CSelect custom size="md" name="plan" id="plan" value={this.state.toComparedDeliveryPlan.id} onChange={(event) => this.handleWithSolution(parseInt(event.target.value))}>
                                                            {this.state.compareDeliveryPlans.map((plan, index) => <option key={index} value={plan.id}>{plan.name}</option>)}
                                                        </CSelect>
                                                    </CCol>
                                                    <CCol md="3">
                                                        <CButton color="warning" onClick={() => this.handleCompareToPlan()}>So s??nh</CButton>
                                                    </CCol>
                                                </CFormGroup>
                                            </CCardHeader>
                                        </CCard>
                                        <CCard>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"></CCol>
                                                    {this.state.isComparingPlan && <CCol md="4"><b>{this.state.isComparingPlan.name}</b></CCol>}
                                                    {this.state.toComparingPlan && <CCol md="4"><b>{this.state.toComparingPlan.name}</b></CCol>}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>T???ng chi ph??</b></CCol>
                                                    {this.state.isComparingPlan && (this.state.isComparingPlan.solution.totalCost < this.state.toComparingPlan.solution.totalCost ? 
                                                    <CCol md="4"><b>{this.state.isComparingPlan.solution.totalCost}</b></CCol> : <CCol md="4">{this.state.isComparingPlan.solution.totalCost}</CCol>)}
                                                    {this.state.toComparingPlan && (this.state.toComparingPlan.solution.totalCost < this.state.isComparingPlan.solution.totalCost ? 
                                                    <CCol md="4"><b>{this.state.toComparingPlan.solution.totalCost}</b></CCol> : <CCol md="4">{this.state.toComparingPlan.solution.totalCost}</CCol>)}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>Doanh thu</b></CCol>
                                                    {this.state.isComparingPlan && <CCol md="4">{this.state.isComparingPlan.solution.revenue}</CCol>}
                                                    {this.state.toComparingPlan && <CCol md="4">{this.state.toComparingPlan.solution.revenue}</CCol>}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>T???ng gi?? tr???</b></CCol>
                                                    {this.state.isComparingPlan && <CCol md="4">{this.state.isComparingPlan.solution.totalAmount}</CCol>}
                                                    {this.state.toComparingPlan && <CCol md="4">{this.state.toComparingPlan.solution.totalAmount}</CCol>}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>Hi???u su???t</b></CCol>
                                                    {this.state.isComparingPlan && 
                                                    (this.state.isComparingPlan.solution.efficiency > this.state.toComparingPlan.solution.efficiency ? 
                                                        <CCol md="4"><b>{this.state.isComparingPlan.solution.efficiency}</b></CCol> : <CCol md="4">{this.state.isComparingPlan.solution.efficiency}</CCol>)}
                                                    {this.state.toComparingPlan && (this.state.toComparingPlan.solution.efficiency > this.state.isComparingPlan.solution.efficiency ? 
                                                        <CCol md="4"><b>{this.state.toComparingPlan.solution.efficiency}</b></CCol> : <CCol md="4">{this.state.toComparingPlan.solution.efficiency}</CCol>)}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>S??? l?????ng xe s??? d???ng</b></CCol>
                                                    {this.state.isComparingPlan && <CCol md="4">{this.state.isComparingPlan.solution.numberVehicle}</CCol>}
                                                    {this.state.toComparingPlan && <CCol md="4">{this.state.toComparingPlan.solution.numberVehicle}</CCol>}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>T???ng qu??ng ???????ng</b></CCol>
                                                    {this.state.isComparingPlan && (this.state.isComparingPlan.solution.totalDistance < this.state.toComparingPlan.solution.totalDistance ? 
                                                        <CCol md="4"><b>{this.state.isComparingPlan.solution.totalDistance}</b></CCol> : <CCol md="4">{this.state.isComparingPlan.solution.totalDistance}</CCol>)}
                                                    {this.state.toComparingPlan && (this.state.toComparingPlan.solution.totalDistance < this.state.isComparingPlan.solution.totalDistance ? 
                                                        <CCol md="4"><b>{this.state.toComparingPlan.solution.totalDistance}</b></CCol> : <CCol md="4">{this.state.toComparingPlan.solution.totalDistance}</CCol>)}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>T???ng th???i gian di chuy???n</b></CCol>
                                                    {this.state.isComparingPlan && (this.state.isComparingPlan.solution.totalTravelTime < this.state.toComparingPlan.solution.totalTravelTime ? 
                                                        <CCol md="4"><b>{this.state.isComparingPlan.solution.totalTravelTime}</b></CCol> : <CCol md="4">{this.state.isComparingPlan.solution.totalTravelTime}</CCol>)}
                                                    {this.state.toComparingPlan && (this.state.toComparingPlan.solution.totalTravelTime < this.state.isComparingPlan.solution.totalTravelTime ? 
                                                        <CCol md="4"><b>{this.state.toComparingPlan.solution.totalTravelTime}</b></CCol> : <CCol md="4">{this.state.toComparingPlan.solution.totalTravelTime}</CCol>)}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>T???ng chi ph?? ph???t</b></CCol>
                                                    {this.state.isComparingPlan && <CCol md="4">{this.state.isComparingPlan.solution.totalPenaltyCost}</CCol>}
                                                    {this.state.toComparingPlan && <CCol md="4">{this.state.toComparingPlan.solution.totalPenaltyCost}</CCol>}
                                                </CRow>
                                            </CCardHeader>
                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="4"><b>S??? ????n h??ng ph???c v???</b></CCol>
                                                    {this.state.isComparingPlan && <CCol md="4">{this.state.isComparingPlan.solution.totalNumberOrders}</CCol>}
                                                    {this.state.toComparingPlan && <CCol md="4">{this.state.toComparingPlan.solution.totalNumberOrders}</CCol>}
                                                </CRow>
                                            </CCardHeader>
                                        </CCard>

                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="secondary" onClick={() => this.hideCompare()}>H???y</CButton>
                                    </CModalFooter>
                                </CModal>
                            }
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
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol >
                        <CCard>
                            <CCardHeader>
                                DeliveryPlans Info
                                <small className="text-muted"> {totalPages} pages</small>
                                <small className="text-muted"> {totalDeliveryPlans} DeliveryPlans</small>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={deliveryPlansData}
                                    fields={[
                                        { key: 'index', label: 'STT' },
                                        { key: 'id', label: 'M?? L??? tr??nh' },
                                        { key: 'name', label: 'T??n l??? tr??nh' },
                                        { key: 'efficiency', label: 'Hi???u su???t' },
                                        { key: 'revenue', label: 'Doanh thu' },
                                        { key: 'numberVehicle', label: 'S??? l?????ng xe' },
                                        { key: 'totalCost', label: 'T???ng chi ph??' },
                                        { key: 'intendReceiveTime', label: 'Ng??y giao d??? ki???n' },
                                        { key: 'actions', label: 'Thao t??c', }

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
                                                                    onClick={() => { this.showCompareModal(item) }}
                                                                >Compare
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
export default DeliveryPlans
