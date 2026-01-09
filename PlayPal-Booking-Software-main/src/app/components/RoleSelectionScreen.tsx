import { User, Building2, Shield } from 'lucide-react';

interface RoleSelectionScreenProps {
  onSelectRole: (role: 'player' | 'owner' | 'admin') => void;
}

export function RoleSelectionScreen({ onSelectRole }: RoleSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2 text-gray-900">Welcome to PlayPal</h1>
          <p className="text-gray-600">Choose your role to continue</p>
        </div>

        <div className="space-y-4">
          {/* Player Role */}
          <button
            onClick={() => onSelectRole('player')}
            className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <User className="text-white" size={32} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl text-gray-900 mb-1">Player</h3>
                <p className="text-gray-600 text-sm">Book and play at amazing venues</p>
              </div>
            </div>
          </button>

          {/* Venue Owner Role */}
          <button
            onClick={() => onSelectRole('owner')}
            className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Building2 className="text-white" size={32} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl text-gray-900 mb-1">Venue Owner</h3>
                <p className="text-gray-600 text-sm">List and manage your sports venue</p>
              </div>
            </div>
          </button>

          {/* Admin Role */}
          <button
            onClick={() => onSelectRole('admin')}
            className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={32} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl text-gray-900 mb-1">Admin</h3>
                <p className="text-gray-600 text-sm">Manage platform and users</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
