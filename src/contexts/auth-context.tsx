
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

// Temporary function to determine role based on email.
// In a production app, this logic should be handled by a secure backend
// using Firebase Custom Claims.
const getRoleFromEmail = (email: string | null): string | null => {
    if (!email) return null;
    if (email.endsWith('@supervisor.edu')) return 'supervisor';
    if (email.endsWith('@university.edu')) return 'student';
    if (email === 'admin@system.edu') return 'admin';
    return null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        // This is the temporary, insecure way of assigning roles for development.
        // In a real app, you would get the role from the token claims.
        const userRole = getRoleFromEmail(user.email);
        setUser(user);
        setRole(userRole);
        
        // This is the secure, production-ready way to get roles.
        // It's commented out because we don't have a backend to set custom claims.
        // const tokenResult = await user.getIdTokenResult();
        // const userRole = (tokenResult.claims.role as string) || null;
        // setUser(user);
        // setRole(userRole);

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
