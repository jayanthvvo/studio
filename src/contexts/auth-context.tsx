
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getAuth, onIdTokenChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        // This is the secure, production-ready way to get roles from custom claims.
        // This requires a backend (like Firebase Cloud Functions) to set the 'role' claim on a user.
        const tokenResult = await user.getIdTokenResult();
        const userRole = (tokenResult.claims.role as string) || null;
        setUser(user);
        setRole(userRole);

      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function ProtectedRoute({ children, requiredRole }: { children: ReactNode, requiredRole: string }) {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push(`/login?redirect=${pathname}`);
            } else if (role !== requiredRole) {
                // User is logged in but does not have the required role
                // Redirect them to a more appropriate page or a generic login page
                console.warn(`Redirecting user with role '${role}' from protected route requiring '${requiredRole}'.`);
                router.push('/login'); 
            }
        }
    }, [user, role, loading, router, requiredRole, pathname]);

    if (loading || !user || role !== requiredRole) {
        return (
             <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
