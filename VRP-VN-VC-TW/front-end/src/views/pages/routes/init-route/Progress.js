import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CContainer, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CProgress, CToast, CToastBody, CToaster, CToastHeader } from "@coreui/react";
import React, { Component } from "react";

class Progress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isProgress: this.props.values.isProgress,
            progressPercent: this.props.values.progressPercent,
            showToast: this.props.values.isInitFail,
        };

    }

    handleConfirm = () => {
        this.props.handleGetRoutes();
    }

    handleCancel = () => {
        this.props.goToStep(1);
    }

    setShowToast = (showToast) => {
        this.setState({
            showToast: showToast
        });
    }

    render() {
        return (
            <CContainer>
                {(this.props.values.isProgress === false) &&
                    <CCard>
                        <CCardHeader>
                            Bạn chưa có lộ trình
                                        </CCardHeader>
                        <CCardBody>
                            <p><b>Xác nhận khởi tạo lộ trình?</b></p>
                            <small><i>Quá trình khởi tạo có thể mất vài phút</i></small>
                        </CCardBody>
                        <CCardFooter>
                            <CButton color="success" onClick={() => this.handleConfirm()}>Xác nhận</CButton>{' '}
                            <CButton color="secondary" onClick={() => this.handleCancel(false)}>Hủy bỏ</CButton>
                        </CCardFooter>
                    </CCard>
                }
                {(this.props.values.isProgress === true) &&
                    <CCard>
                        <CCardHeader>
                            Đang khởi tạo lộ trình tối ưu
                        </CCardHeader>
                        <CCardBody>
                            <CProgress animated precision={this.props.values.progressPercent === 100 ? 0 : 1} showPercentage step="0.01" value={this.props.values.progressPercent} className="mb-3" />
                        </CCardBody>
                    </CCard>
                }
                {(this.props.values.isInitFail === true) &&
                    <CToaster position='top-right'>
                    <CToast
                        key={'toastSuccess'}
                        show={true}
                        autohide={4000}
                        fade={true}
                        onStateChange={(showToast) => { this.setShowToast(showToast) }}
                    >
                        <CToastHeader closeButton>Notification</CToastHeader>
                        <CToastBody>
                            {"Khởi tạo lộ trình thất bại"}
                        </CToastBody>
                    </CToast>
                </CToaster>
            
                }
            </CContainer>
        );
    }

}

export default Progress;