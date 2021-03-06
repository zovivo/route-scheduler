import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CContainer, CDataTable, CFormGroup, CInput, CLabel, CNav, CNavItem, CNavLink, CRow, CSwitch, CTabContent, CTabPane, CTabs } from "@coreui/react";
import React, { Component } from "react";
import { secondsToHHMMSS } from "../../utilities/utility";


class RouteInitInfoTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            depots: this.processDepotsData(this.props.depots),
            customers: this.processCustomersData(this.props.customers),
            orders: this.props.orders,
            vehicles: this.props.vehicles,
            problemAssumption: this.props.problemAssumption,
        };
    }

    processCustomersData = (customersData) => {
        customersData.map((customer, index) => {
            customer.startTimeStr = secondsToHHMMSS(customer.startTime);
            customer.endTimeStr = secondsToHHMMSS(customer.endTime);
        });
        return customersData;
    }

    processDepotsData = (depotsData) => {
        depotsData.map((depot, index) => {
            depot.startTimeStr = secondsToHHMMSS(depot.startTime);
            depot.endTimeStr = secondsToHHMMSS(depot.endTime);
        });
        return depotsData;
    }

    render() {

        return (
            <CContainer sm="12">
                <CRow>
                    <CCol >
                        <CCard>
                            <CCardHeader>
                                Input Info
                        </CCardHeader>
                            <CCardBody>
                                <CTabs>
                                    <CNav variant="tabs">
                                        <CNavItem>
                                            <CNavLink>
                                                Orders
                                            </CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink>
                                                Customers
                                        </CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink>
                                                Depots
                                        </CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink>
                                                Vehicles
                                            </CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink>
                                                Configuration
                                            </CNavLink>
                                        </CNavItem>
                                    </CNav>
                                    <CTabContent>
                                        <CTabPane>
                                            <CDataTable
                                                items={this.state.orders}
                                                fields={[
                                                    { key: 'code', label: 'M?? ????n h??ng' },
                                                    // { key: 'depotCode', label: 'M?? kho h??ng' },
                                                    { key: 'customerCode', label: 'M?? kh??ch h??ng' },
                                                    { key: 'orderValue', label: 'Gi?? tr??? ????n h??ng(VND)' },
                                                    { key: 'weight', label: 'Kh???i l?????ng(kg)' },
                                                    { key: 'capacity', label: 'Th??? t??ch(m3)' },
                                                    { key: 'productTypeNumber', label: 'S??? lo???i s???n ph???m' },

                                                ]}
                                                hover
                                                striped
                                                bordered
                                                size="lg"
                                                itemsPerPage={5}
                                                pagination
                                                scopedSlots={
                                                    {
                                                        'depotCode':
                                                            (item) => {
                                                                return (
                                                                    <td className="py-2">
                                                                        <span>{item.depot.code}</span>
                                                                    </td>
                                                                )
                                                            },
                                                        'customerCode':
                                                            (item) => {
                                                                return (
                                                                    <td className="py-2">
                                                                        <span>{item.customer.code}</span>
                                                                    </td>
                                                                )
                                                            },

                                                    }}
                                            />
                                        </CTabPane>
                                        <CTabPane>
                                            <CDataTable
                                                items={this.state.customers}
                                                fields={[
                                                    { key: 'name', _classes: 'font-weight-bold', label: 'T??n kh??ch h??ng' },
                                                    { key: 'code', label: 'M?? kh??ch h??ng' },
                                                    { key: 'longitude', label: 'Kinh ?????' },
                                                    { key: 'latitude', label: 'V?? ?????' },
                                                    { key: 'address', label: '?????a ch???' },
                                                    { key: 'startTimeStr', label: 'Th???i ??i???m m??? c???a' },
                                                    { key: 'endTimeStr', label: 'Th???i ??i???m ????ng c???a' },

                                                ]}
                                                hover
                                                striped
                                                bordered
                                                size="lg"
                                                itemsPerPage={5}
                                                pagination
                                                scopedSlots={{
                                                }}
                                            />
                                        </CTabPane>
                                        <CTabPane>
                                            <CDataTable
                                                items={this.state.depots}
                                                fields={[
                                                    { key: 'name', _classes: 'font-weight-bold', label: 'T??n kho' },
                                                    { key: 'code', label: 'M?? kho' },
                                                    { key: 'longitude', label: 'Kinh ?????' },
                                                    { key: 'latitude', label: 'V?? ?????' },
                                                    { key: 'address', label: '?????a ch???' },
                                                    { key: 'startTimeStr', label: 'Th???i ??i???m m??? c???a' },
                                                    { key: 'endTimeStr', label: 'Th???i ??i???m ????ng c???a' },
                                                    // { key: 'unloadingCost', label: 'Ph?? d??? h??ng(VND)' },
                                                ]}
                                                hover
                                                striped
                                                bordered
                                                size="lg"
                                                itemsPerPage={5}
                                                pagination
                                                scopedSlots={{
                                                }}
                                            />
                                        </CTabPane>
                                        <CTabPane>
                                            <CDataTable
                                                items={this.state.vehicles}
                                                fields={[
                                                    { key: 'name', _classes: 'font-weight-bold', label: 'T??n Xe' },
                                                    { key: 'capacity', label: 'S???c ch???a(kg/m3)' },
                                                    { key: 'averageFeeTransport', label: 'Ph?? di chuy???n(VND/km)' },
                                                    { key: 'averageVelocity', label: 'V???n t???c trung b??nh(km/h)' },
                                                    { key: 'driverName', label: 'T??n l??i xe' },
                                                    { key: 'type', label: 'Lo???i xe' },

                                                ]}
                                                hover
                                                striped
                                                bordered
                                                size="lg"
                                                itemsPerPage={5}
                                                pagination
                                                scopedSlots={
                                                    {
                                                        'capacity':
                                                            (item) => {
                                                                return (
                                                                    <td className="py-2">
                                                                        <span>{item.maxLoadWeight + "/" + item.maxCapacity}</span>
                                                                    </td>
                                                                )
                                                            },
                                                    }}
                                            />
                                        </CTabPane>
                                        <CTabPane>
                                            <CRow row>
                                                <CCol xs="6">
                                                    <CCard xs="6" className="mb-0">
                                                        <CCardHeader id="headingOne">
                                                            <h5 className="m-0 p-0">C?? b???n</h5>
                                                        </CCardHeader>
                                                        <CCardBody>
                                                            <CFormGroup row xs="10" className="my-0">
                                                                <CCol xs="5">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="maxTravelTime">Th???i gian ch???y xe t???i ??a(gi???)</CLabel>
                                                                        <CInput id="maxTravelTime" name="maxTravelTime" value={this.props.problemAssumption.maxTravelTime} disabled={true} placeholder="max travel time" type='number' step="0.01" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                                <CCol xs="5">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="maxDistance">Qu??ng ???????ng ch???y t???i ??a(km)</CLabel>
                                                                        <CInput id="maxDistance" name="maxDistance" value={this.props.problemAssumption.maxDistance} disabled={true} placeholder="max distance" type='number' step="0.1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                            </CFormGroup>
                                                            <CFormGroup row xs="10" className="my-0">
                                                                <CCol xs="3">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="maxTime">Th???i gian ch???y thu???t to??n t???i ??a</CLabel>
                                                                        <CInput id="maxTime" name="maxTime" value={this.props.problemAssumption.maxTime} disabled={true} placeholder="maxTime" type='number' step="0.1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                                <CCol xs="3">
                                                                    <CFormGroup>
                                                                        <CRow>
                                                                            <CLabel htmlFor="isAllowedViolateTW.">Cho ph??p vi ph???m khung th???i gian</CLabel>
                                                                        </CRow>
                                                                        <CSwitch id='isAllowedViolateTW' name="isAllowedViolateTW" size="lg" checked={this.props.problemAssumption.isAllowedViolateTW} color={'success'} className={'mx-1'} variant={'3d'} labelOn={'\u2713'} labelOff={'\u2715'} />
                                                                    </CFormGroup>
                                                                </CCol>
                                                                <CCol xs="2">
                                                                    <CFormGroup>
                                                                        <CRow>
                                                                            <CLabel htmlFor="isExcludeProduct">T??? ?????ng lo???i tr??? h??ng h??a</CLabel>
                                                                        </CRow>
                                                                        <CSwitch id='isExcludeProduct' name="isExcludeProduct" size="lg" checked={this.props.problemAssumption.isExcludeProduct} color={'success'} className={'mx-1'} variant={'3d'} labelOn={'\u2713'} labelOff={'\u2715'} />
                                                                    </CFormGroup>
                                                                </CCol>
                                                            </CFormGroup>
                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                                <CCol xs="6">
                                                    <CCard className="mb-0">
                                                        <CCardHeader id="headingTwo">
                                                            <h5 className="m-0 p-0">N??ng cao</h5>
                                                        </CCardHeader>
                                                        <CCardBody>
                                                            <CFormGroup row className="my-0">
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="popSize">K??ch th?????c qu???n th??? (c?? th???)</CLabel>
                                                                        <CInput id="popSize" name="popSize" value={this.props.problemAssumption.popSize} disabled={true} placeholder="popSize" type='number' step="1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="eliteSize">K??ch th?????c t???p tinh hoa (c?? th???)</CLabel>
                                                                        <CInput id="eliteSize" name="eliteSize" value={this.props.problemAssumption.eliteSize} disabled={true} placeholder="eliteSize" type='number' step="1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                            </CFormGroup>
                                                            <CFormGroup row className="my-0">
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="maxGen">S??? th??? h??? t???i ??a ???????c sinh</CLabel>
                                                                        <CInput id="maxGen" name="maxGen" value={this.props.problemAssumption.maxGen} disabled={true} placeholder="maxGen" type='number' step="1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="maxGenImprove">S??? th??? h??? t???i ??a kh??ng c???i thi???n</CLabel>
                                                                        <CInput id="maxGenImprove" name="maxGenImprove" value={this.props.problemAssumption.maxGenImprove} disabled={true} placeholder="maxGen" type='number' step="1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                            </CFormGroup>
                                                            <CFormGroup row className="my-0">
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="probCrossover">X??c su???t Lai gh??p</CLabel>
                                                                        <CInput id="probCrossover" name="probCrossover" value={this.props.problemAssumption.probCrossover} disabled={true} placeholder="probCrossover" type='number' step="0.01" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="probMutation">X??c su???t ?????t bi???n</CLabel>
                                                                        <CInput id="probMutation" name="probMutation" value={this.props.problemAssumption.probMutation} disabled={true} placeholder="probMutation" type='number' step="0.01" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                            </CFormGroup>
                                                            <CFormGroup row className="my-0">
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="tournamentSize">S??? c?? th??? ???????c ch???n</CLabel>
                                                                        <CInput id="tournamentSize" name="tournamentSize" value={this.props.problemAssumption.tournamentSize} disabled={true} placeholder="tournamentSize" type='number' step="1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                                <CCol xs="4">
                                                                    <CFormGroup>
                                                                        <CLabel htmlFor="selectionRate">T??? l??? t???p ch???n l???c</CLabel>
                                                                        <CInput id="selectionRate" name="selectionRate" value={this.props.problemAssumption.probMutation} disabled={true} placeholder="selectionRate" type='number' step="1" />
                                                                    </CFormGroup>
                                                                </CCol>
                                                            </CFormGroup>
                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                            </CRow>
                                        </CTabPane>
                                    </CTabContent>
                                </CTabs>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        );
    }

}

export default RouteInitInfoTabs;
