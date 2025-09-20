export type Submission = {
  id: string;
  student: {
    name: string;
    avatarUrl: string;
  };
  title: string;
  status: 'Pending' | 'In Review' | 'Approved' | 'Requires Revisions';
  deadline: string;
  grade: string | null;
  submittedAt: string;
  content: string;
  feedback: string | null;
};

export type Message = {
    id: string;
    sender: 'student' | 'supervisor';
    text: string;
    timestamp: string;
};
