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
      <div className="container mx-auto px-4 py-20 text-center">
        <Package className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some items before checking out.
        </p>
        <Link
          to="/shops"
          className="inline-block px-6 py-2 bg-gold-gradient rounded-lg"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 border p-6 rounded-xl">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <ShieldCheck className="h-5 w-5 text-yellow-600" />
          Guest Checkout
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              className="w-full border-2 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
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
            <label className="font-semibold">Phone</label>
            <input
              className="w-full border-2 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold">Address</label>
            <input
              className="w-full border-2 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex gap-2 ">
                <input
                  type="radio"
                  checked={form.paymentMethod === "cod"}
                  onChange={() => handleChange("paymentMethod", "cod")}
                />
                Cash on Delivery
              </label>

              <label className="flex gap-2">
                <input
                  type="radio"
                  checked={form.paymentMethod === "online"}
                  onChange={() => handleChange("paymentMethod", "online")}
                />
                Online Payment
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Summary */}
      <div className="border p-6 rounded-xl h-fit">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-yellow-600" />
          Order Summary
        </h2>

        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.product.product_id} className="flex justify-between">
              <span>
                {item.product.name} (x{item.quantity})
              </span>
              <span>
                Rs {(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t-2 pt-3 space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>Rs {delivery}</span>
          </div>

          <div className="flex justify-between font-bold border-t-2 pt-4">
            <span>Total</span>
            <span>Rs {total.toLocaleString()}</span>
          </div>
        </div>
        <button className="w-full bg-gold-gradient text-lg py-3 mt-4 rounded-lg flex items-center justify-center gap-1">
          Place Order
        </button>
      </div>
    </div>
  );
}
