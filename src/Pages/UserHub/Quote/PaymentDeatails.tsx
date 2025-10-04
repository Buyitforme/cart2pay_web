import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Card } from "../../../Components/Card";
import { Button } from "../../../Components/Button";
import { AppDispatch, RootState } from "../../../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "../../../Components/Typography";

import toast from "react-hot-toast";
import {
  triggerConfirmPayment,
  triggerOrderDetails,
} from "../../../redux/features/orderManagement/orderManagementThunk";
import { PageLoader } from "../../../Components/PageLoader";
import Modal from "../../../Components/Modal";
import { resetConfirmPaymentState } from "../../../redux/features/orderManagement/orderManagementSlice";

export default function PaymentDeatails() {
  const { orderId } = useParams();
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentComfirmed] = useState(false);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const { orderDetails, confirmPayment } = useSelector(
    (state: RootState) => state.order_management
  );

  const accountDetails = {
    bank: "Guarantee Trust Bank",
    accountName: "ShopViaCal Ltd",
    accountNumber: "1234567890",
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(accountDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handlePaymentConfirmation = () => {
    if (!orderId) {
      return;
    }
    dispatch(triggerConfirmPayment(orderId!));
  };
  useEffect(() => {
    if (!confirmPayment.error && confirmPayment.statusCode === 200) {
      setPaymentComfirmed(true);
    } else if (confirmPayment.error) {
      toast.error(confirmPayment.message);
    }
    dispatch(resetConfirmPaymentState())
  }, [confirmPayment.error, confirmPayment.message, confirmPayment.statusCode, dispatch]);
  useEffect(() => {
    if (!orderId) {
      toast.error("order unavalaible");
      return;
    }
    dispatch(triggerOrderDetails(orderId!));
  }, [dispatch, orderId]);
  if (orderDetails.loading || !orderDetails.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }
return (
  <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 py-4 sm:py-8">
    <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-lg sm:shadow-2xl rounded-2xl sm:rounded-3xl border-0 backdrop-blur-sm bg-white/95">
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
        {/* Trust Badge & Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-1 sm:mb-2">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
            Complete your order
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto leading-relaxed px-2">
  Please pay the exact amount due to the account details below.
          </p>
        </div>

        {/* Account Details Card */}
        <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-5">
          {/* Bank Details */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Bank</p>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 break-words">
              {accountDetails.bank}
            </p>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* Account Name */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Account Name
            </p>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 break-words sm:text-right sm:max-w-[60%]">
              {accountDetails.accountName}
            </p>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* Account Number with Copy */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Account Number
            </p>
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 font-mono break-all sm:break-normal">
                {accountDetails.accountNumber}
              </p>
              <button
                onClick={copyAccountNumber}
                className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white shadow-sm hover:shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
                title="Copy account number"
              >
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>
          </div>
          
          <div className="h-px bg-gray-200"></div>

          {/* Amount */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Amount</p>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 break-words sm:text-right sm:max-w-[60%]">
              ₦{orderDetails.data?.results?.sum_total.toLocaleString()}
            </p>
          </div>

          {/* Copy Success Message */}
          {copied && (
            <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-700 text-xs sm:text-sm font-medium">
                Account number copied!
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="w-full bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-blue-900 mb-1 sm:mb-2">
                Next Steps:
              </h4>
              <ol className="text-xs sm:text-sm text-blue-800 space-y-1.5 sm:space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span className="min-w-0">Transfer the exact amount to the account above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span className="min-w-0">Click "I've Made Payment" below after completing the transfer</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Security Note & Button */}
        <div className="w-full space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs text-gray-500">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-center leading-tight">
              Your payment is secured and will be verified automatically
            </span>
          </div>

          <Button
            variant="primary"
            onClick={handlePaymentConfirmation}
            loading={confirmPayment.loading}
            disabled={
              !["approved", "pending"].includes(
                orderDetails?.data?.results?.status ?? ""
              )
            }
          >
            I've Made Payment
          </Button>
        </div>

        {/* Support Link */}
        <p className="text-xs text-gray-500 text-center px-2">
          Need help?{" "}
          <a
            href="/contact-us"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </Card>

    {/* Modal */}
    <Modal
      isOpen={paymentConfirmed}
      onClose={() => setPaymentComfirmed(false)}
    >
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center">
          Payment Confirmation Submitted
        </h2>

        {/* Body text */}
        <Text size="sm" className="text-center text-gray-500 px-2 leading-relaxed">
          Great! We've received your payment confirmation. You'll be notified
          via email once the payment is verified.
        </Text>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-sm mt-2 sm:mt-4">
          <Button
            variant="primary"
            className="w-full h-10 sm:h-11 text-sm sm:text-base"
            onClick={() => setPaymentComfirmed(false)}
          >
            Ok
          </Button>

          <Button
            variant="outline"
            className="w-full h-10 sm:h-11 text-sm sm:text-base"
            onClick={() => navigate("/dashboard/new-order")}
          >
            Start New Order
          </Button>
        </div>
      </div>
    </Modal>
  </div>
);
}
