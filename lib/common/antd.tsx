// lib/ui/common/antd/DynamicForm.tsx
import dynamic from 'next/dynamic';
export const DynamicForm = dynamic(() => import('antd/es/form'), { ssr: false });

// lib/ui/common/antd/DynamicInput.tsx
export const DynamicInput = dynamic(() => import('antd/es/input'), { ssr: false });
