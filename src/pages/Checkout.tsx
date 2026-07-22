import { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShieldCheck, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cod" as "cod" | "online",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const delivery = 0;
  const total = subtotal + delivery;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (form.phone.length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.address.trim()) newErrors.address = "Address is required";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-4 text-center max-w-md w-full">
          <Package className="h-16 w-16 text-yellow-500 mx-auto mb-6" />

          <h2 className="text-3xl text-gray-800 mb-3">Your Cart is Empty</h2>

          <p className="text-gray-500 mb-6 text-sm">
            Looks like you haven't added any products yet. Browse our collection
            and find something you'll love.
          </p>

          <Link
            to="/shops"
            className="inline-flex items-center justify-center w-full bg-gold-gradient text-white font-semibold py-3 rounded-xl hover:opacity-90 transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Guest Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
              <ShieldCheck className="text-yellow-500" size={28} />
              Shipping Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  className="w-full border-2 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-2 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  className="w-full border-2 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Address
                </label>
                <input
                  className="w-full border-2 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Payment */}
              <div>
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <div className="space-y-4">
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${
                      form.paymentMethod === "cod"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={form.paymentMethod === "cod"}
                      onChange={() => handleChange("paymentMethod", "cod")}
                    />

                    <div>
                      <div className="font-semibold">Cash on Delivery</div>

                      <div className="text-sm text-gray-500">
                        Pay after receiving the product.
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${
                      form.paymentMethod === "online"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={form.paymentMethod === "online"}
                      onChange={() => handleChange("paymentMethod", "online")}
                    />

                    <div>
                      <div className="font-semibold">Online Payment</div>

                      <div className="text-sm text-gray-500">
                        Pay securely with Khalti or eSewa.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <button className="w-full bg-gold-gradient text-lg py-3 mt-4 rounded-lg flex items-center justify-center gap-1">
                Place Order
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Package className="text-yellow-500" />
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={item.product.product_id}
                  className="flex justify-between items-center py-3 border-b"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>

                <span>Rs {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>

                <span>FREE</span>
              </div>

              <div className="border-t pt-5 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-yellow-600">
                  Rs {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
