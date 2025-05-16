"use client"

import { CodeSnippet } from "@/components/ui/CodeSnippet"
import { Card } from "@/components/ui/Card";

export function CodeSnippetExample() {
  // Example TypeScript code
  const typescriptExample = `import { useState, useEffect } from 'react';

// Define interface for user data
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

// Simple hook to fetch user data
export function useUserData(userId: number): User | null {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [userId]);
  
  return user;
}`;

  // Example JavaScript code
  const javascriptExample = `// Function to create animation with timeout
function animateElement(element, className, duration) {
  return new Promise((resolve) => {
    element.classList.add(className);
    
    setTimeout(() => {
      element.classList.remove(className);
      resolve();
    }, duration);
  });
}

// Process payment form
async function processPayment(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submit-button');
  const formData = new FormData(event.target);
  
  try {
    // Show loading state
    await animateElement(submitBtn, 'loading', 300);
    
    // Simulate API call
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Payment failed');
    
    // Show success state
    await animateElement(submitBtn, 'success', 1000);
    
  } catch (error) {
    console.error(error);
    // Show error state
    await animateElement(submitBtn, 'error', 1000);
  }
}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Tokyo Theme</h3>
        <CodeSnippet 
          code={typescriptExample}
          theme="tokyo"
          filename="hooks/useUserData.ts"
          maxHeight="400px"
        />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Light Theme</h3>
        <CodeSnippet 
          code={javascriptExample}
          theme="light"
          filename="utils/animation.js"
          language="javascript"
          maxHeight="400px"
        />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Dark Theme (inline)</h3>
        <Card className="p-5">
          <p className="mb-4 text-sm text-gray-400">Example of a snippet inside a card container:</p>
          <CodeSnippet 
            code={`const greeting = "Hello World!";
console.log(greeting);`}
            theme="dark"
            maxHeight="100px"
            showLineNumbers={false}
          />
        </Card>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Minimal Example</h3>
        <CodeSnippet 
          code={`// API endpoints
export const ENDPOINTS = {
  auth: "/api/auth",
  users: "/api/users",
  products: "/api/products"
};`}
          theme="tokyo"
          maxHeight="120px"
          filename="constants.js"
        />
      </div>
    </div>
  );
} 