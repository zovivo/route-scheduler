import CIcon from "@coreui/icons-react";
import { CBadge, CButton, CCard, CCardBody, CCardHeader, CDataTable, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSelect } from "@coreui/react";
import React, { Component } from "react";

class ClusteringCustomers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: this.props.values.clusteringCustomers,
            depots: this.props.values.depots,
            showConfirm: false,
        };
    }

    componentDidMount() {
        let customers = this.props.values.clusteringCustomers;
        customers.forEach(customer => {
            customer.isAvailableDepot = this.isAvailableDepot(customer.clusterDepot, customer);
        });
        this.setState({ customers })
    }

    isAvailableDepot = (depot, customer) => {
        return customer.availableDepots.some(availableDepot=>availableDepot.id === depot.id);
    }

    handleChangeClusterDepot = (id, index) => {
        let editingClusteringCustomer = {
            id: this.state.customers[index].id,
            name: this.state.customers[index].name,
            code: this.state.customers[index].code,
            index: index
        };
        let depots = this.state.depots;
        depots.map((depot) => {
            if (depot.id === id) {
                editingClusteringCustomer.clusterDepot = depot;
            }
        });
        this.setState({
            showConfirm: true,
            editingClusteringCustomer: editingClusteringCustomer
        });
    }

    setShowConfirm = (isShowConfirm) => {
        this.setState({ showConfirm: isShowConfirm });
    }

    handleConfirm = () => {
        let customers = this.state.customers;
        let clusteringCustomer = customers[this.state.editingClusteringCustomer.index];
        clusteringCustomer.clusterDepot = this.state.editingClusteringCustomer.clusterDepot;
        clusteringCustomer.isAvailableDepot = this.isAvailableDepot(clusteringCustomer.clusterDepot, clusteringCustomer);
        customers[this.state.editingClusteringCustomer.index] = clusteringCustomer;
        this.setState({ customers: customers, editingClusteringCustomer: undefined });
        this.setShowConfirm(false);
    }

    handleCancel = () => {
        this.setState({ editingClusteringCustomer: undefined });
        this.setShowConfirm(false);
    }



    render() {
        return (
            <CCard>
                {this.state.editingClusteringCustomer &&
                    <CModal
                        show={this.state.showConfirm}
                        onClose={() => this.setShowConfirm(false)}
                        color="warning"
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Edit Clustering Customer</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CCard>
                                <CCardBody>
                                    <p><b>{"Xác nhận thay đổi phân kho của khách hàng " + this.state.editingClusteringCustomer.name + " ?"}</b></p>
                                </CCardBody>
                            </CCard>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="success" onClick={() => this.handleConfirm()}>Confirm</CButton>{' '}
                            <CButton color="secondary" onClick={() => this.handleCancel()}>Cancel</CButton>
                        </CModalFooter>
                    </CModal>
                }
                <CCardHeader>
                    Phân cụm khách hàng
                    <div className="card-header-actions">
                        <CButton onClick={() => this.props.prevStep()} size="sm" color="dark"><CIcon name="cil-arrow-left" /> Back</CButton>
                        &nbsp;
                        <CButton onClick={() => this.props.nextStep()} size="sm" color="success">Next <CIcon name="cil-arrow-right" /></CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {(this.state.customers) &&
                        <CDataTable
                            items={this.state.customers}
                            fields={[
                                { key: 'index', label: 'STT' },
                                { key: 'code', label: 'Mã khách hàng' },
                                { key: 'name', label: 'Tên Khách hàng' },
                                { key: 'clusterDepot', label: 'Phân kho' },
                                { key: 'isAvailableDepot', label: 'Tình trạng hàng' },
                            ]}
                            hover
                            striped
                            bordered
                            size="lg"
                            itemsPerPage={20}
                            pagination
                            scopedSlots={
                                {
                                    'index':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <span>{(index + 1)}</span>
                                                </td>
                                            )
                                        },
                                    'clusterDepot':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CSelect custom size="md" name="selectDepot" id="depot" value={item.clusterDepot.id} onChange={(event) => this.handleChangeClusterDepot(parseInt(event.target.value), index)}>
                                                        {this.state.depots.map((depot, index) => <option key={index} value={depot.id}>{depot.name}</option>)}
                                                    </CSelect>
                                                </td>
                                            )
                                        },
                                    'isAvailableDepot':
                                        (item) => {
                                            return (
                                                <td>
                                                    <CBadge size="lg" color={item.isAvailableDepot === true ? "success" : "warning"}>
                                                        {item.isAvailableDepot === true ? "đáp ứng" : "không đáp ứng"}
                                                    </CBadge>
                                                </td>
                                            )
                                        },
                                }
                            }
                        />
                    }
                </CCardBody>
            </CCard>
        );
    }


}

export default ClusteringCustomers;