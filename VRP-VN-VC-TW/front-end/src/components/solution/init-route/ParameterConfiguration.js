import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CFormGroup, CInput, CLabel, CRow, CSpinner, CSwitch } from "@coreui/react";
import React, { Component } from "react";

class ParameterConfiguration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            problemAssumption: {},
            accordions: [0],
        };

    }

    setAccordions = (accordions) => {
        this.setState({ accordions: accordions })
    }

    addAccordion = (accordion) => {
        let accordions = this.state.accordions;
        accordions.push(accordion);
        this.setAccordions(accordions);
    }

    removeAccordion = (accordion) => {
        let accordions = this.state.accordions;
        accordions = accordions.filter(item => item !== accordion)
        this.setAccordions(accordions);
    }

    checkAccordion = (accordion) => {
        return this.state.accordions.includes(accordion);
    }

    updateAccordions = (accordion) => {
        if (this.checkAccordion(accordion) === true)
            this.removeAccordion(accordion);
        else
            this.addAccordion(accordion);
    }

    render() {
        const { values } = this.props;
        console.log(values);
        return (
            <CCard>
                <CCardHeader>
                    Cấu hình thuật toán
                    <CRow className="card-header-actions">
                        {this.props.isWaiting === true &&
                            <div>
                                <CSpinner size='sm' color='green'></CSpinner>
                                &nbsp;
                                Preparing Data...
                                &nbsp;
                            </div>
                        }
                        <CButton disabled={this.props.isWaiting} onClick={() => this.props.nextStep()} size="sm" color="success">Next <CIcon name="cil-arrow-right" /></CButton>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CCard className="mb-0">
                        <CCardHeader id="headingOne">
                            <CButton
                                block
                                color="link"
                                className="text-left m-0 p-0"
                                onClick={() => this.updateAccordions(0)}
                            >
                                <h5 className="m-0 p-0">Cơ bản</h5>
                            </CButton>
                        </CCardHeader>
                        <CCollapse show={this.checkAccordion(0) === true}>
                            <CCardBody>
                                <CFormGroup row xs="10" className="my-0">
                                    <CCol xs="2">
                                        <CFormGroup>
                                            <CRow>
                                                <CLabel htmlFor="isLimitedTime">Giới hạn giờ chạy</CLabel>
                                            </CRow>
                                            <CSwitch id='isLimitedTime' name="isLimitedTime" size="lg" checked={values.isLimitedTime} color={'success'} onChange={this.props.handleInputChange} className={'mx-1'} variant={'3d'} labelOn={'\u2713'} labelOff={'\u2715'} />
                                        </CFormGroup>
                                    </CCol>
                                    {values.isLimitedTime === true &&
                                        <CCol xs="3">
                                            <CFormGroup>
                                                <CLabel htmlFor="maxTravelTime">Thời gian chạy xe tối đa(giờ)</CLabel>
                                                <CInput id="maxTravelTime" name="maxTravelTime" value={values.maxTravelTime} onChange={this.props.handleInputChange} placeholder="maxTime" type='number' step="0.01" />
                                            </CFormGroup>
                                        </CCol>
                                    }
                                    <CCol xs="2">
                                        <CFormGroup>
                                            <CRow>
                                                <CLabel htmlFor="isLimitedDistance">Giới hạn quãng đường</CLabel>
                                            </CRow>
                                            <CSwitch id='isLimitedDistance' name="isLimitedDistance" size="lg" checked={values.isLimitedDistance} color={'success'} onChange={this.props.handleInputChange} className={'mx-1'} variant={'3d'} labelOn={'\u2713'} labelOff={'\u2715'} />
                                        </CFormGroup>
                                    </CCol>
                                    {values.isLimitedDistance === true &&
                                        <CCol xs="3">
                                            <CFormGroup>
                                                <CLabel htmlFor="maxDistance">Quãng đường chạy tối đa(km)</CLabel>
                                                <CInput id="maxDistance" name="maxDistance" value={values.maxDistance} onChange={this.props.handleInputChange} placeholder="maxDistance" type='number' step="0.1" />
                                            </CFormGroup>
                                        </CCol>
                                    }
                                </CFormGroup>

                                {/* <CFormGroup row xs="10" className="my-0">
                                    <CCol xs="2">
                                        <CFormGroup>
                                            <CRow>
                                                <CLabel htmlFor="isLimitedNumNode">Giới hạn số đơn hàng</CLabel>
                                            </CRow>
                                            <CSwitch id='isLimitedNumNode' name="isLimitedNumNode" size="lg" checked={values.isLimitedNumNode} color={'success'} onChange={this.props.handleInputChange} className={'mx-1'} variant={'3d'} labelOn={'\u2713'} labelOff={'\u2715'} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="3">
                                        <CFormGroup>
                                            <CLabel htmlFor="limitedNumNode">Số đơn hàng tối đa trên một xe</CLabel>
                                            <CInput id="limitedNumNode" name="limitedNumNode" value={values.limitedNumNode} onChange={this.props.handleInputChange} placeholder="limitedNumNode" type='number' step="0.01" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
 */}
                                <CFormGroup row xs="10" className="my-0">
                                    <CCol xs="3">
                                        <CFormGroup>
                                            <CLabel htmlFor="maxTime">Thời gian chạy thuật toán tối đa (phút)</CLabel>
                                            <CInput id="maxTime" name="maxTime" value={values.maxTime} onChange={this.props.handleInputChange} placeholder="maxTime" type='number' step="0.1" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="3">
                                        <CFormGroup>
                                            <CRow> 
                                                <CLabel htmlFor="isAllowedViolateTW.">Cho phép vi phạm khung thời gian</CLabel>
                                            </CRow>
                                            <CSwitch id='isAllowedViolateTW' name="isAllowedViolateTW" size="lg" checked={values.isAllowedViolateTW} color={'success'} onChange={this.props.handleInputChange} className={'mx-1'} variant={'3d'} labelOn={'\u2713'} labelOff={'\u2715'} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="2">
                                        <CFormGroup>
                                            <CRow>
                                                <CLabel htmlFor="isExcludeProduct">Tự động loại trừ hàng hóa</CLabel>
                                            </CRow>
                                            <CSwitch id='isExcludeProduct' name="isExcludeProduct" size="lg" checked={values.isExcludeProduct} color={'success'} onChange={this.props.handleInputChange} className={'mx-1'} variant={'3d'} labelOn={'\u2713'} labelOff={'\u2715'} />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                    <CCard className="mb-0">
                        <CCardHeader id="headingTwo">
                            <CButton
                                block
                                color="link"
                                className="text-left m-0 p-0"
                                onClick={() => this.updateAccordions(1)}
                            >
                                <h5 className="m-0 p-0">Nâng cao</h5>
                            </CButton>
                        </CCardHeader>
                        <CCollapse show={this.checkAccordion(1) === true}>
                            <CCardBody>
                                <CFormGroup row className="my-0">
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="popSize">Kích thước quần thể (cá thể)</CLabel>
                                            <CInput id="popSize" name="popSize" value={values.popSize} onChange={this.props.handleInputChange} placeholder="popSize" type='number' step="1" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="eliteSize">Kích thước tập tinh hoa (cá thể)</CLabel>
                                            <CInput id="eliteSize" name="eliteSize" value={values.eliteSize} onChange={this.props.handleInputChange} placeholder="eliteSize" type='number' step="1" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row className="my-0">
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="maxGen">Số thế hệ tối đa được sinh</CLabel>
                                            <CInput id="maxGen" name="maxGen" value={values.maxGen} onChange={this.props.handleInputChange} placeholder="maxGen" type='number' step="1" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="maxGenImprove">Số thế hệ tối đa không cải thiện</CLabel>
                                            <CInput id="maxGenImprove" name="maxGenImprove" value={values.maxGenImprove} onChange={this.props.handleInputChange} placeholder="maxGen" type='number' step="1" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row className="my-0">
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="probCrossover">Xác suất Lai ghép</CLabel>
                                            <CInput id="probCrossover" name="probCrossover" value={values.probCrossover} onChange={this.props.handleInputChange} placeholder="probCrossover" type='number' step="0.01" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="probMutation">Xác suất Đột biến</CLabel>
                                            <CInput id="probMutation" name="probMutation" value={values.probMutation} onChange={this.props.handleInputChange} placeholder="probMutation" type='number' step="0.01" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row className="my-0">
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="tournamentSize">Số cá thể được chọn</CLabel>
                                            <CInput id="tournamentSize" name="tournamentSize" value={values.tournamentSize} onChange={this.props.handleInputChange} placeholder="tournamentSize" type='number' step="1" />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="selectionSize">Kích thước tập chọn lọc</CLabel>
                                            <CInput id="selectionSize" name="selectionSize" value={values.probMutation} onChange={this.props.handleInputChange} placeholder="selectionSize" type='number' step="1" />
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </CCardBody>
            </CCard>
        );
    }

}

export default ParameterConfiguration;