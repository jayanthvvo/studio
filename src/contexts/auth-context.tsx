
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
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const email = user.email || '';
        let userRole: string | null = null;
        if (email === 'admin@system.in') {
          userRole = 'admin';
        } else if (email.endsWith('@supervisor.in')) {
          userRole = 'supervisor';
        } else if (email.endsWith('@university.in')) {
          userRole = 'student';
        }
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
                // If not loading and no user, redirect to login
                router.push(`/login?redirect=${pathname}`);
            } else if (role !== requiredRole) {
                // If not loading, user exists, but role doesn't match, redirect to login
                // This prevents users from accessing routes they are not authorized for
                router.push('/login'); 
            }
        }
    }, [user, role, loading, router, requiredRole, pathname]);

    // While loading, or if the user is not authenticated yet, or role doesn't match, show a spinner.
    // The useEffect above will handle the redirection.
    if (loading || !user || role !== requiredRole) {
        return (
             <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // If all checks pass, render the children
    return <>{children}</>;
}
