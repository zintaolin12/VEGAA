export default function ProfilePage() {
  return (
    <div className="max-w-lg space-y-4">
      <div className="bg-[#0b1220] border border-blue-900/30 p-4 rounded">
        <p className="text-blue-400">Account</p>
        <p className="text-sm">Wallet connected</p>
      </div>

      <div className="bg-[#0b1220] border border-blue-900/30 p-4 rounded">
        <p className="text-blue-400">Security</p>
        <p className="text-sm">2FA Disabled</p>
      </div>
    </div>
  );
}
