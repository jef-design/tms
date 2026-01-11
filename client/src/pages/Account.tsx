import { Mail, Phone, MapPin, User, Shield } from "lucide-react";

// Temporary sample data (design only)
const account = {
  name: "Jeff Bermejo",
  email: "jeff.bermejo@email.com",
  phone: "+63 912 345 6789",
  role: "Super Administrator",
  address: "Quezon City, Philippines",
  joinedAt: "January 2024",
};

export default function Account() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-semibold text-white">
              {account.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{account.name}</h1>
              <p className="text-sm text-gray-500">Member since {account.joinedAt}</p>
            </div>
          </div>

          <button className="rounded-xl">Edit Profile</button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Personal Info */}
          <div className="rounded-2xl  bg-white shadow-sm md:col-span-2">
            <div className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>

              <div className="space-y-3">
                <InfoRow icon={User} label="Full Name" value={account.name} />
                <InfoRow icon={Mail} label="Email" value={account.email} />
                <InfoRow icon={Phone} label="Phone" value={account.phone} />
                <InfoRow icon={MapPin} label="Address" value={account.address} />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-2xl bg-white shadow-sm">
            <div className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>

              <div className="flex items-center gap-3 rounded-xl border border-gray-300 p-4">
                <Shield className="h-5 w-5 text-gray-700" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Role</p>
                  <p className="text-sm text-gray-500">{account.role}</p>
                </div>
              </div>

              <div  className="w-full rounded-xl text-center shadow text-xs p-2">
                Change Password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
        <Icon className="h-4 w-4 text-gray-700" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
