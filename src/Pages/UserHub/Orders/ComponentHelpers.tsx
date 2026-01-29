import TextLoader from "../../../Components/TextLoader";

export const StatusBadge = ({ status }: { status?: string }) => {
  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

return (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyle(status)}`}
  >
    Status:{" "}
    {status
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : <TextLoader />}
  </span>
);

};

export const InfoCard = ({ 
  title, 
  value, 
  className = "bg-gray-50 border-gray-100" 
}: {
  title: string;
  value?: string | null;
  className?: string;
}) => (
  <div className={`p-4 rounded-xl border ${className}`}>
    <div className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-base font-semibold text-gray-900 truncate">
          {value || <TextLoader />}
        </p>
      </div>
    </div>
  </div>
);

export const DetailItem = ({ 
  label, 
  value, 
  className = ""
}: {
  label: string;
  value?: string | null;
  className?: string;
}) => (
  <div className={`p-4 bg-gray-50 rounded-xl border border-gray-100 ${className}`}>
    <div className="flex items-start gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900 break-words">
          {value || <TextLoader />}
        </p>
      </div>
    </div>
  </div>
);

export const ItemCard = ({ item, index }: { item: any; index: number }) => (
  <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 hover:bg-gray-100 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Item #{index + 1}</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="bg-white px-2 py-1 rounded border">
          Qty: {item.variant?.quantity || 'N/A'}
        </span>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Product URL</p>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline break-all font-medium"
          >
            {item.link}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {item.variant?.size && (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Size</p>
              <p className="text-sm font-semibold text-gray-900">{item.variant.size}</p>
            </div>
          </div>
        )}

        {item.variant?.color && (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Color</p>
              <p className="text-sm font-semibold text-gray-900">{item.variant.color}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);