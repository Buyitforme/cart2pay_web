import { useNavigate, useParams } from "react-router-dom";
import { useEffect} from "react";
import { Heading} from "../../../Components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderDetails } from "../../../redux/features/orderManagement/orderManagementThunk";
import { ArrowLeft } from "lucide-react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { orderDetails } = useSelector(
    (state: RootState) => state.order_management
  );
      const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
   const order = orderDetails?.data?.results;

  const parsedDetails = order?.details ? JSON.parse(order.details) : [];

useEffect(() => {
    console.log('id',orderId)
    dispatch(triggerOrderDetails(orderId!));
  }, [dispatch, orderId]);
  

 return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
        <div className="flex gap-1  items-center">
                <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-4"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
      </button>
      <Heading size="2xl" weight="bold" className="mb-6">
        Order Details
      </Heading>
        </div>


      <div className="space-y-4">
        <DetailRow label="Order ID" value={order?._id} />
        <DetailRow label="Store" value={order?.store} />
        <DetailRow label="Delivery address" value={order?.address} />
        <DetailRow label="Phone" value={order?.phone} />
        <DetailRow label="Email" value={order?.email} />
        <DetailRow label="Status" value={order?.status} />
        <DetailRow label="Date created" value={new Date(order?.createdAt).toLocaleString()} />

        <div>
          <h2 className="text-lg font-semibold mb-2">Items:</h2>
          <ul className="space-y-3">
            {parsedDetails.map((item: any, index: number) => (
              <li
                key={index}
                className="p-4 border rounded-xl bg-gray-50 text-sm text-gray-800"
              >
                <p><span className="font-semibold">Item url:</span> {item.link}</p>
                <p><span className="font-semibold">Size:</span> {item.variant?.size}</p>
                <p><span className="font-semibold">Color:</span> {item.variant?.color}</p>
                <p><span className="font-semibold">Quantity:</span> {item.variant?.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <SummaryBox label="Items Total" value={order?.total} />
          <SummaryBox label="Shiping Fee" value={order?.fee} />
          <SummaryBox label="Surcharge" value={order?.surcharge} />
          <SummaryBox label="Cart2pay Fee" value={order?.service_fee} />
                    <SummaryBox label="Local delivery" value={order?.delivery} />

          <SummaryBox label="Sum total" value={order?.sumTotal} />
        </div>
      </div>
    </div>
  );
};
const DetailRow = ({ label, value }: { label: string; value: string | number | null }) => (
  <div className="flex justify-between border-b py-2 text-gray-700">
    <span className="font-medium">{label}</span>
    <span>{value ?? '—'}</span>
  </div>
);

const SummaryBox = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-semibold">{value ?? 0}</div>
  </div>
);

export default OrderDetails;
